import { Property } from '../parsers';
import { Serializer } from './serializer';

export class JsonSerializer extends Serializer {
  serialize(...data: Property[]): string {
    return JSON.stringify(data);
  }
}
