import { Injectable } from '@nestjs/common';
import { JunitSlurper } from './parsers/junit.slurper';
import { PrometheusSerializer } from './serializers';

@Injectable()
export class FacadeService {
  constructor(
    private readonly junit: JunitSlurper,
    private readonly prometheus: PrometheusSerializer,
  ) {}

  parseJunit(content: any, labels: Record<string, string>) {
    this.junit.parse(content, labels);
  }

  toPrometheus(): string {
    return this.prometheus.serialize(...this.junit.properties);
  }
}
