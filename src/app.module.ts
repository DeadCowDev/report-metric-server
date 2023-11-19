import { Module } from '@nestjs/common';
import {
  HealthController,
  SlurpController,
  MetricsController,
} from './controllers';
import { ServicesModule } from './services';

@Module({
  imports: [ServicesModule],
  controllers: [SlurpController, HealthController, MetricsController],
  providers: [],
})
export class AppModule {}
