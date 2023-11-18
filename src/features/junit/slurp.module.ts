import { Module } from '@nestjs/common';
import { SlurpJunitController } from './controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [SlurpJunitController],
  providers: [AppService],
})
export class SlurpJunitModule {}
