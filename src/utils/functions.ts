import { BadRequestException } from '@nestjs/common';
import { pbkdf2Sync, randomBytes } from 'crypto';

export function verifyHashedPassword(
  passwordInput: string,
  passwordHash: string,
) {
  const buffer = Buffer.from(passwordHash, 'base64');
  const byteArray = [...buffer];
  const saltByteArray = byteArray.slice(1, 17);
  const hashByteArray = byteArray.slice(17, 49);
  const iterations = 1000;
  const keylen = 32;
  const derivedKey = pbkdf2Sync(
    passwordInput,
    Buffer.from(saltByteArray),
    iterations,
    keylen,
    'sha1',
  );
  const derivedKeyArray = [...derivedKey];
  const isMatch = derivedKeyArray.every(
    (element, index) => element === hashByteArray[index],
  );
  if (isMatch) {
    return true;
  } else {
    return false;
  }
}

export function hashPassword(newPassword: string) {
  if (newPassword == null) {
    throw new Error('Uma senha é necessária!');
  }

  const salt = randomBytes(16);
  const keySize = 32;
  const iterations = 1000;
  const digest = 'sha1';

  const key = pbkdf2Sync(newPassword, salt, iterations, keySize, digest);

  const result = Buffer.alloc(49);
  salt.copy(result, 1, 0, 16);
  key.copy(result, 17, 0, keySize);
  return result.toString('base64');
}

export function concatSort(sort: string, enumName: any, defaultSort: string) {
  const sortArray = sort.replace(/\s/g, '').split(',');
  const sortValues = [];

  try {
    sortArray.forEach((sortItem) => {
      const sortValue = enumName[sortItem];
      if (!sortValues.join().includes(sortValue.split(' ')[0]))
        sortValues.push(sortValue);
    });
  } catch (e) {
    console.log(e);
    sortValues.push(defaultSort);
  }

  return sortValues.join(', ');
}

export function calcPagination(total, page, pageSize) {
  const totalPages = Math.ceil(total / (pageSize ?? 50));
  const offset = ((page ?? 1) - 1) * pageSize;

  return [totalPages, offset];
}

export function parseDate(dateString: string): Date | string {
  try {
    if (dateString == '') return dateString;
    if (!/^[0-9/-]{1,10}$/.test(dateString)) throw new Error('Data inválida');
    const formats = [
      'yyyyMMdd',
      'yyyy-MM-dd',
      'yyyy/MM/dd',
      'dd-MM-yyyy',
      'dd/MM/yyyy',
    ];
    let year = null;
    let month = null;
    let day = null;
    for (const format of formats) {
      const regex = new RegExp(
        format
          .replace(/yyyy/g, '\\d{4}')
          .replace(/MM/g, '\\d{2}')
          .replace(/dd/g, '\\d{2}'),
      );
      if (regex.test(dateString)) {
        if (/^\d{8}$/.test(dateString)) {
          year = format.indexOf('yyyy') == 0 ? dateString.slice(0, 4) : null;
          month = format.indexOf('MM') == 4 ? dateString.slice(4, 6) : null;
          day = format.indexOf('dd') == 6 ? dateString.slice(6) : null;
          if (
            year === null ||
            month === null ||
            day === null ||
            Number(month) < 1 ||
            Number(month) > 12 ||
            Number(day) < 1 ||
            Number(day) > 31
          ) {
            throw new Error('Data inválida');
          }
        } else {
          const parts = dateString.split(/[-/]/);
          year = format.indexOf('yyyy') == 0 ? parts[0] : parts[2];
          month = format.indexOf('MM') == 5 ? parts[1] : parts[1];
          day = format.indexOf('dd') == 8 ? parts[2] : parts[0];
          if (
            year === null ||
            month === null ||
            day === null ||
            Number(month) < 1 ||
            Number(month) > 12 ||
            Number(day) < 1 ||
            Number(day) > 31
          ) {
            throw new Error('Data inválida');
          }
        }

        return new Date(Number(year), Number(month) - 1, Number(day));
      }
    }
    throw new Error('Data inválida');
  } catch {
    throw new BadRequestException({
      Sucesso: false,
      Mensagem: 'Formato de data incompatível',
    });
  }
}

// Validators
export function validarCPF(strCPF: string): boolean {
  let soma: number;
  let resto: number;
  soma = 0;
  if (strCPF === '00000000000') return false;
  if (!/^\d+$/.test(strCPF)) {
    return false;
  }
  for (let i = 1; i <= 9; i++)
    soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto !== parseInt(strCPF.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto !== parseInt(strCPF.substring(10, 11))) return false;
  if (strCPF.includes('*')) return false;
  return true;
}

export function validarNome(nome: string): boolean {
  const regex = /^[a-zA-Z\u00C0-\u017F ]+$/; // aceitar acento

  return regex.test(nome);
}

export function includesKey(objeto, chave) {
  if (objeto.hasOwnProperty(chave)) {
    return true;
  }

  const chaves = chave.split('.');
  let objetoAtual = objeto;

  for (let i = 0; i < chaves.length; i++) {
    const chaveAtual = chaves[i];

    if (objetoAtual.hasOwnProperty(chaveAtual)) {
      objetoAtual = objetoAtual[chaveAtual];
    } else {
      return false;
    }
  }

  return true;
}

export function addFieldObj(obj, field, value) {
  const fields = field.split('.');
  let actualObj = obj;

  for (let i = 0; i < fields.length - 1; i++) {
    const key = fields[i];

    if (!actualObj[key] || typeof actualObj[key] !== 'object') {
      actualObj[key] = {};
    }

    actualObj = actualObj[key];
  }

  const lastKey = fields[fields.length - 1];
  actualObj[lastKey] = value;

  return obj;
}

export function objToStr(obj: any) {
  const changes = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const campo = `${key}: ${obj[key]}`;
      changes.push(campo);
    }
  }
  return changes.join(', ');
}
