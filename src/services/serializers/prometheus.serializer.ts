import { Property } from '../parsers';
import { Serializer } from './serializer';

export class PrometheusSerializer extends Serializer {
  serialize(...data: Property[]): string {
    return data
      .filter((p) => p.values.length > 0)
      .map((p) => {
        const type = this.propertyMapToPrometheusType(p.type);
        return `# HELP ${p.name} ${p.description}\n# TYPE ${
          p.name
        } ${type}\n${p.values
          .map(
            ({ labels, value }) =>
              `${p.name}${this.parseLabels(labels)} ${value}`,
          )
          .join('\n')}`;
      })
      .join('\n\n');
  }

  parseLabels(labels: Record<string, string>) {
    if (Object.keys(labels).length === 0) {
      return '';
    }
    return `{${Object.keys(labels)
      .map((l) => `${l}="${labels[l]}"`)
      .join(', ')}}`;
  }

  propertyMapToPrometheusType(p: Property['type']): string {
    switch (p) {
      case 'counter':
        return 'counter';
      case 'variable':
        return 'gauge';
    }
  }
}
