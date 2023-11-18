import { Controller, Get, Header } from '@nestjs/common';
import { FacadeService } from '../services';

@Controller('/metrics')
export class MetricsController {
  constructor(private readonly facade: FacadeService) {}

  @Get('prometheus')
  @Header('content-type', 'text/plain; version=0.0.4; charset=utf-8')
  asPrometheus(): string {
    return this.facade.toPrometheus();
  }
  @Get('json')
  @Header('content-type', 'application/json')
  asJson(): string {
    return this.facade.toJson();
  }
}
