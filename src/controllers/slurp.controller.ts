import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import { FacadeService } from 'src/services/facade.service';

@Controller('slurp')
export class SlurpController {
  constructor(private readonly slurper: FacadeService) {}

  @Post('junit')
  @HttpCode(202)
  parseJunit(@Body() body: any, @Query() query: Record<string, string>): void {
    this.slurper.parseJunit(body, query);
  }
}
