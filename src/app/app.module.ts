import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { HttpModule } from '@nestjs/axios';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { config } from 'src/config/env';
import { GroupsModule } from 'src/modules/groups/groups.module';
import { SqlModule } from 'src/modules/sql/sql.module';
import { LogModule } from 'src/modules/log/log.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    LogModule,
    HttpModule,
    GroupsModule,
    SqlModule,
    SentryModule.forRoot({
      dsn: config.sentry.dsn,
      environment: config.sentry.environment,
      release: '1.0.0',
    }),
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
