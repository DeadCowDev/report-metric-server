import { Controller, Get, Header } from '@nestjs/common';
import { FacadeService } from '../services';
import { ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/metrics')
@ApiTags('Metrics')
export class MetricsController {
  constructor(private readonly facade: FacadeService) {}

  @Get('prometheus')
  @Header('content-type', 'text/plain; version=0.0.4; charset=utf-8')
  @ApiResponse({
    status: 200,
    description: 'Current metrics in prometheus format',
  })
  @ApiProduces('text/plain; version=0.0.4; charset=utf-8')
  asPrometheus(): string {
    return this.facade.toPrometheus();
  }
  @Get('json')
  @Header('content-type', 'application/json')
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'Current metrics in JSON format',
  })
  asJson(): string {
    return this.facade.toJson();
  }
}
