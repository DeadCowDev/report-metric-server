import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/health')
@ApiTags('Health')
export class HealthController {
  constructor() {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Service is Healthy',
  })
  healthy(): string {
    return 'ok';
  }
}
