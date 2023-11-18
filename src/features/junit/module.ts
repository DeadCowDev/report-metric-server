import { Module } from '@nestjs/common';
import { SlurpJunitController } from './controller';
import { JunitSlurper } from './junit-parser.service';

@Module({
  imports: [],
  controllers: [SlurpJunitController],
  providers: [JunitSlurper],
})
export class SlurpJunitModule {}
