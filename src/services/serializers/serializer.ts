import { Property } from '../parsers';

export abstract class Serializer {
  abstract serialize(...data: Property[]): string;
}
