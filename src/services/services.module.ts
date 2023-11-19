import { Module } from '@nestjs/common';
import { JunitSlurper } from './parsers';
import { FacadeService } from './facade.service';
import { JsonSerializer, PrometheusSerializer } from './serializers';

const parsers = [JunitSlurper];

const serializers = [PrometheusSerializer, JsonSerializer];

@Module({
  imports: [],
  controllers: [],
  providers: [...parsers, ...serializers, FacadeService],
  exports: [FacadeService],
})
export class ServicesModule {}
