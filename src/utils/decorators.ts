import {
  ExecutionContext,
  Type,
  UseFilters,
  UseInterceptors,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { validarCPF, validarNome } from './functions';
import { MaskingInterceptor } from './mask.interceptor';
import { HttpExceptionFilter } from './http-exceptions.filter';

export const ApiResponseCustom = <DataDto extends Type<unknown>>(
  model: any,
  dataDto?: DataDto,
  status?: number,
) => {
  if (!status) status = 200;
  return applyDecorators(
    ApiExtraModels(model, dataDto),
    ApiResponse({
      status: status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(model) },
          {
            properties: {
              Data: {
                $ref: getSchemaPath(dataDto),
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiResponseCustomList = <DataDto extends Type<unknown>>(
  model: any,
  dataDto?: DataDto,
  status?: number,
) => {
  if (!status) status = 200;
  return applyDecorators(
    ApiExtraModels(model, dataDto),
    ApiResponse({
      status: status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(model) },
          {
            properties: {
              Data: {
                type: 'array',
                items: {
                  $ref: getSchemaPath(dataDto),
                },
              },
            },
          },
        ],
      },
    }),
  );
};

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    if (!validationOptions) {
      validationOptions = {};
    }
    if (!validationOptions.message) {
      validationOptions.message = 'CPF é inválido';
    }
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && validarCPF(value);
        },
      },
    });
  };
}

export function IsValidName(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    if (!validationOptions) {
      validationOptions = {};
    }
    if (!validationOptions.message) {
      validationOptions.message = 'Nome inválido';
    }
    registerDecorator({
      name: 'IsValidName',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && validarNome(value);
        },
      },
    });
  };
}

export const HasAccess = createParamDecorator(
  (acao: unknown, ctx: ExecutionContext): boolean => {
    const request = ctx.switchToHttp().getRequest();
    // const userAcao = request.user.acoes.split(',');

    const hasAccess = true;
    // const hasAccess = userAcao.includes(acao);

    // if (!hasAccess) {
    //   throw new UnauthorizedException();
    // }

    return hasAccess;
  },
);

export function MaskData(escape?: string) {
  return applyDecorators(UseInterceptors(new MaskingInterceptor(escape)));
}

export function HttpFilter() {
  return applyDecorators(UseFilters(new HttpExceptionFilter()));
}
