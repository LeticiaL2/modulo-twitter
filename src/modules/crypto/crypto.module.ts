import { Module } from '@nestjs/common';
import { CryptoService } from './service/crypto.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
