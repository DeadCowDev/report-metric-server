import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FacadeService } from 'src/services/facade.service';

@Controller('slurp')
@ApiTags('Slurp')
export class SlurpController {
  constructor(private readonly slurper: FacadeService) {}

  @Post('junit')
  @HttpCode(202)
  @ApiResponse({ status: 202, description: 'Test result accepted' })
  @ApiQuery({
    description: 'Labels to apply to the test result',
    required: false,
  })
  @ApiBody({
    description: 'Junit XML test result',
  })
  @ApiConsumes('application/xml')
  parseJunit(@Body() body: any, @Query() query: Record<string, string>): void {
    this.slurper.parseJunit(body, query);
  }
}
