import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { JunitSlurper } from './junit-parser.service';

@Controller('slurp/junit')
export class SlurpJunitController {
  constructor(private readonly slurper: JunitSlurper) {}

  @Post()
  @HttpCode(202)
  parseToPrometheus(
    @Body() body: any,
    @Query() query: Record<string, string>,
  ): void {
    this.slurper.parse(body, query);
  }

  @Get()
  getMe(): any {
    return this.slurper.properties;
  }
}
