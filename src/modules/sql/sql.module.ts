import { Module } from '@nestjs/common';
import { SqlService } from '../sql/service/sql.service';

@Module({
  providers: [SqlService],
  exports: [SqlService],
})
export class SqlModule {}
