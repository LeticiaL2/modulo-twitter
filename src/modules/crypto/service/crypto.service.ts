import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  crypto = require('crypto');
  ENC = 'bf3c199c2470cb477d907b1e0917c17b';
  IV = '5183666c72eec9e4';
  ALGO = 'aes-256-cbc';

  encrypt = (text) => {
    const cipher = this.crypto.createCipheriv(this.ALGO, this.ENC, this.IV);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  };

  decrypt = (text) => {
    try {
      const decipher = this.crypto.createDecipheriv(
        this.ALGO,
        this.ENC,
        this.IV,
      );
      const decrypted = decipher.update(text, 'hex', 'utf8');
      return decrypted + decipher.final('utf8');
    } catch (error) {
      throw new BadRequestException({
        Sucesso: false,
        Mensagem: 'Erro no formato do id',
      });
    }
  };
}
