import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SqlService } from '../sql/service/sql.service';
import { GroupsController } from './controller/groups.controller';
import { GroupsService } from './service/groups.service';
import { CryptoService } from '../crypto/service/crypto.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [GroupsController],
  providers: [GroupsService, SqlService, JwtService, CryptoService],
  exports: [GroupsService],
})
export class GroupsModule {}
