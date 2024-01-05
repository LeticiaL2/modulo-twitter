import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // Extrair a primeira mensagem de erro
    const errorResponse = exception.getResponse();
    let firstErrorMessage = exception.message;

    if (typeof errorResponse === 'object' && 'message' in errorResponse) {
      firstErrorMessage = errorResponse['message'][0];
    }

    // Formatar a resposta de erro
    response.status(status).json({
      status: false,
      mensagem: {
        codigo: status,
        texto: firstErrorMessage,
      },
      conteudo: null,
    });
  }
}
