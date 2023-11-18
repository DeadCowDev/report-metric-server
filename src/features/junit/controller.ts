import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('slurp/junit')
export class SlurpJunitController {
  constructor(private readonly appService: AppService) {}

  @Get('prometheus')
  getHello(): string {
    return this.appService.getHello();
  }
}
