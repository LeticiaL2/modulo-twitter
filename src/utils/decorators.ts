import { Type } from '@nestjs/passport'
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger'
import { applyDecorators } from '@nestjs/common'

export const ApiResponseCustom = <DataDto extends Type<unknown>>(
  model: any,
  dataDto?: DataDto,
  status?: number,
) => {
  if (!status) status = 200
  return applyDecorators(
    ApiExtraModels(model, dataDto),
    ApiResponse({
      status: status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(model) },
          {
            properties: {
              conteudo: {
                $ref: getSchemaPath(dataDto),
              },
            },
          },
        ],
      },
    }),
  )
}

export const ApiResponseCustomList = <DataDto extends Type<unknown>>(
  model: any,
  dataDto?: DataDto,
  status?: number,
) => {
  if (!status) status = 200
  return applyDecorators(
    ApiExtraModels(model, dataDto),
    ApiResponse({
      status: status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(model) },
          {
            properties: {
              conteudo: {
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
  )
}
