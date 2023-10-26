import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health-Check')
@Controller()
export class AppController {
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get()
  healthCheck() {
    return 'Server connected with success!';
  }
}
