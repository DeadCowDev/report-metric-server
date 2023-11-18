import { Controller, Get } from '@nestjs/common';
import { FacadeService } from '../services';

@Controller('/metrics')
export class MetricsController {
  constructor(private readonly facade: FacadeService) {}

  @Get('prometheus')
  asPrometheus(): string {
    return this.facade.toPrometheus();
  }
}
