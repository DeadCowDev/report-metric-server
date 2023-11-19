import { Module } from '@nestjs/common';
import {
  HealthController,
  SlurpController,
  MetricsController,
  PreviewController,
} from './controllers';
import { ServicesModule } from './services';

@Module({
  imports: [ServicesModule],
  controllers: [
    SlurpController,
    HealthController,
    MetricsController,
    PreviewController,
  ],
  providers: [],
})
export class AppModule {}
