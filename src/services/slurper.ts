import { ParsingSchema, PropertySchema } from 'src/models/schema';
import * as stringMath from 'string-math';

type Property = {
  name: string;
  description: string;
  type: PropertySchema['type'];
  values: { value: any; labels: Record<string, string> }[];
};

type PropertyParser<T> = {
  name: string;
  pattern: Array<
    string | ((content: T, values: Record<string, string>) => any)
  >;
};

export abstract class Slurper<T = any> {
  private readonly _properties: Property[] = [];
  get properties(): Property[] {
    return this._properties;
  }
  private readonly parsers: PropertyParser<T>[] = [];
  constructor(private readonly schema: ParsingSchema) {
    Object.keys(schema).forEach((k) => {
      this.generateProperty(k);
      this.generatePropertyParser(k);
    });
  }

  private generateProperty(name: string) {
    this._properties.push({
      description: this.schema[name].description,
      name: name.toString(),
      type: this.schema[name].type,
      values: [],
    });
  }
  private generatePropertyParser(name: string) {
    // if property parser already exists then we don't need to generate it again
    if (this.parsers.findIndex((g) => g.name === name) >= 0) return;
    const curr = this.schema[name];

    // normalize instructions by splitting them by space and removing empty strings
    const instructions = curr.value
      .split(' ')
      .map((i) => i.trim())
      .filter((i) => !!i.length);

    const pattern: PropertyParser<T>['pattern'] = [];

    for (const instruction of instructions) {
      if (instruction.startsWith('$')) {
        // if instruction starts with '$' we need to generate that property first to ensure
        // that a value exists before processing the current property when calling parse()
        const nm = instruction.slice(1);
        this.generatePropertyParser(nm);
        pattern.push((_, values) => values[nm]);
        return;
      }
      if (instruction.startsWith('{') && instruction.endsWith('}')) {
        // if instruction is in between "{" "}" then we can assume that it is a property path
        // and we need to get the value of that property first before processing the current property
        const nm = instruction
          .slice(1, -1)
          .split('.')
          .map((i) => i.trim())
          .filter((i) => !!i.length);
        pattern.push((curr) => this.getProperty(curr, nm));
        return;
      }
      // if instruction is not a property path or a reference to another property then its a normal value, we can just push it to the pattern
      pattern.push(instruction);
    }

    this.parsers.push({
      name,
      pattern,
    });
  }

  private getProperty(content: any, propertyList: string[]) {
    // get property value from content using property path
    let curr = content;
    for (const property of propertyList) {
      curr = curr?.[property];
    }
    return curr ?? 0;
  }

  parse(content: T, labels: Record<string, string>): void {
    const values: Record<string, string> = {};

    this.parsers.forEach((g) => {
      const p: string[] = [];

      for (const instruction of g.pattern) {
        if (typeof instruction === 'string') {
          p.push(instruction);
        } else {
          p.push(instruction(content, values));
        }
      }

      const eq = p.join(' ');
      values[g.name] = stringMath(eq);
      const idx = this._properties.findIndex((p) => p.name === g.name);
      this._properties[idx].values.push({
        labels,
        value: values[g.name],
      });
    });
  }
}
