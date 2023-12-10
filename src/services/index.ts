import { Property } from "./parsers";
import { JunitSlurper } from "./parsers/junit.slurper";
import { JsonSerializer, PrometheusSerializer } from "./serializers";

export class FacadeService {
  constructor(
    private readonly junit: JunitSlurper,
    private readonly prometheus: PrometheusSerializer,
    private readonly json: JsonSerializer
  ) {}

  private get properties(): Property[] {
    return [...this.junit.properties];
  }

  parseJunit(content: any, labels: Record<string, string>) {
    this.junit.parse(content, labels);
  }

  toPrometheus(): string {
    return this.prometheus.serialize(...this.properties);
  }
  toJson(): string {
    return this.json.serialize(...this.properties);
  }
}

const globalForServices = globalThis as unknown as {
  facadeService?: FacadeService;
};

export const facadeService =
  globalForServices.facadeService ??
  new FacadeService(
    new JunitSlurper(),
    new PrometheusSerializer(),
    new JsonSerializer()
  );

globalForServices.facadeService = facadeService;
