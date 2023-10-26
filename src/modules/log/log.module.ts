import { Global, Module } from '@nestjs/common';
import { LogUtilProvider } from './service/log.provider';

@Global()
@Module({
  imports: [],
  providers: [LogUtilProvider],
  exports: [LogUtilProvider],
})
export class LogModule {}
