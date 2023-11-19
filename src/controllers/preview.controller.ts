import { Body, Controller, Header, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/preview')
@ApiTags('Preview')
export class PreviewController {
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Parsed body to JSON',
  })
  @ApiConsumes('application/xml', 'application/json')
  @ApiBody({
    description: 'body to parse',
  })
  @Header('content-type', 'application/json')
  @ApiProduces('application/json')
  previewXml(@Body() xml: any): any {
    return JSON.stringify(xml);
  }
}
