import { Injectable, Logger } from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';

@Injectable()
export class LogUtilProvider {
  private readonly client: SentryService = new SentryService();
  private readonly logger: Logger = new Logger(LogUtilProvider.name);

  Error(origem: string, exception: Error, titulo?: string, error?: any) {
    if (exception == null) exception = error;
    this.logger.error(exception);

    this.client.instance().captureException(titulo, (scope) => {
      scope.setTag('error-type', origem);
      return scope;
    });
  }

  Message(
    origem: string,
    titulo?: string,
    mensagem?: any,
    tipo?: any,
    tag?: string,
  ) {
    this.logger.log(mensagem);

    if (tipo == null) tipo = 'info';

    const clientInstance = this.client.instance();
    clientInstance.withScope(function (scope) {
      scope.setTag('evento', titulo);
      scope.setTag('codigo', tag);
      scope.setTransactionName('[' + origem + '] Evento: ' + titulo);
      scope.setExtra('data', mensagem);
      clientInstance.captureMessage('[' + origem + '] Evento: ' + titulo, tipo);
    });
  }

  Trace(
    origem: string,
    titulo?: string,
    data?: any,
    fila?: string,
    tag?: string,
  ) {
    this.Message(origem, titulo, data, 'debug', tag);
  }
}
