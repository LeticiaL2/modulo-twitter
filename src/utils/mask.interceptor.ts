import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MaskingInterceptor implements NestInterceptor {
  constructor(private readonly escapeFields: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const visualizandoDados = request.user?.visualizandoDados === true;

    return next.handle().pipe(
      map((data) => {
        if (data.FileAccept) {
          response.header('Content-Type', data.FileAccept);
          response.attachment(data?.FileName);
          if (!visualizandoDados) {
            this.maskData(data.Data);
          }
          data = data.convertBody(data.FileAccept, data.Data);
        } else if (!visualizandoDados) {
          this.maskData(data, this.escapeFields);
        }
        return data;
      }),
    );
  }

  private maskData(data: any, escape?: string): void {
    const fieldsToEscape = escape ? escape.split(',') : [];
    const maskCpfList = ['cpf'];
    const maskDocumentList = ['numero'];
    const maskEmailList = ['email'];
    const maskNameList = ['nome', 'nome_mae'];
    const maskPhoneList = ['celular'];
    const maskCepList = ['CEP'];
    const maskDateList = ['data_nascimento'];
    const maskAllStrList = ['renda'];
    const maskDefaultList = [
      'cidade',
      'Cidade',
      'logradouro',
      'bairro',
      'profissao',
      'ocupacao',
    ];

    if (data && typeof data === 'object') {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = this.removeMask(data[key]);
          if (maskCpfList.includes(key) && !fieldsToEscape.includes(key)) {
            data[key] = this.maskCPF(value);
          } else if (
            maskDocumentList.includes(key) &&
            !fieldsToEscape.includes(key)
          ) {
            data[key] = this.maskDocument(value);
          } else if (
            maskEmailList.includes(key) &&
            !fieldsToEscape.includes(key)
          ) {
            data[key] = this.maskEmail(value);
          } else if (
            maskNameList.includes(key) &&
            !fieldsToEscape.includes(key)
          ) {
            data[key] = this.maskName(value);
          } else if (
            maskPhoneList.includes(key) &&
            !fieldsToEscape.includes(key)
          ) {
            data[key] = this.maskPhone(value);
          } else if (
            maskCepList.includes(key) &&
            !fieldsToEscape.includes(key)
          ) {
            data[key] = this.maskCEP(value);
          } else if (
            maskDateList.includes(key) &&
            !fieldsToEscape.includes(key)
          ) {
            data[key] = this.maskDate(value);
          } else if (
            maskAllStrList.includes(key) &&
            !fieldsToEscape.includes(key)
          ) {
            data[key] = this.maskAllStr(value);
          } else if (
            maskDefaultList.includes(key) &&
            !fieldsToEscape.includes(key)
          ) {
            data[key] = this.maskDefault(value);
          } else if (typeof value === 'object') {
            this.maskData(value, escape);
          }
        }
      }
    }
  }

  removeMask(value) {
    if (!value) return null;

    if (typeof value == 'string') {
      if (
        (value.includes('.') || value.includes('-')) &&
        !value.includes('@') &&
        !value.includes(':')
      )
        return value.replace(/[.-]/g, '');
    }
    return value;
  }

  maskCPF(cpf) {
    if (!cpf) return null;

    const cpfStr = cpf.toString();
    if (cpfStr.length !== 11) return cpfStr;

    return (
      cpfStr.substring(0, 3) +
      '*'.repeat(cpfStr.length - 7) +
      cpfStr.substring(cpfStr.length - 2)
    );
  }

  maskDocument(document) {
    if (!document) return null;

    const documentStr = document.toString();
    const tamanho = documentStr.length;

    if (tamanho <= 6) {
      return documentStr;
    }

    const visibleStr = documentStr.slice(3, documentStr.length - 3);

    return '***' + visibleStr + '***';
  }

  maskEmail(email) {
    if (!email) return null;

    const emailStr: string = email.toString();
    if (!emailStr.includes('@')) return email;

    const [username, domain] = emailStr.split('@');
    const firstThree = username.slice(0, 3);
    return `${firstThree}***@${domain}`;
  }

  maskCEP(cep) {
    if (!cep) return null;

    const cepStr = cep.toString();
    return cepStr.replace(/(\d{2})(\d{3})(\d{3})/, '$1***$3');
  }

  maskName(name) {
    if (!name) return null;

    const names = name.trim().split(' ');
    const firstName = names[0];
    const lastName = names[names.length - 1];

    if (names.length === 1) {
      return name;
    } else {
      return `${firstName} *** ${lastName}`;
    }
  }

  maskPhone(phone) {
    if (!phone) return null;

    const phoneStr = phone.toString();
    if (phoneStr.length < 6) return phoneStr;

    const ddd = phoneStr.slice(0, 2);
    const firstTwo = phoneStr.slice(2, 4);
    const lastTwo = phoneStr.slice(-2);

    return `${ddd} ${firstTwo}***${lastTwo}`;
  }

  maskDate(date) {
    if (!date) return null;

    try {
      const isoDate = new Date(date).toISOString();
      const year = isoDate.slice(0, 4);

      return isoDate.replace(year, '*'.repeat(year.length));
    } catch (error) {
      return date;
    }
  }

  maskAllStr(text) {
    if (!text) return null;
    return '*****';
  }

  maskDefault(text) {
    if (!text) return null;

    const textStr = text.toString();
    if (textStr.length <= 6) return textStr;

    const firstThree = textStr.slice(0, 3);
    const lastThree = textStr.slice(-3);

    return `${firstThree}***${lastThree}`;
  }
}
