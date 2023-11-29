import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('root')
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Ir para página principal' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  getHello(): string {
    return this.appService.getHello()
  }
}
