import { ParsingSchema, PropertySchema } from "../../models/schema";
import { executeOperation, generateDocumentPropertyMapper } from "../../utils";

type Labels = Record<string, string>;

export type Property = {
  name: string;
  description: string;
  type: PropertySchema["type"];
  values: { value: any; labels: Labels }[];
};

type PropertyParser<T> = {
  type: PropertySchema["type"];
  name: string;
  pattern: Array<string | ((content: T, values: Labels, oldValue: any) => any)>;
  validLabels?: PropertySchema["validLabels"];
  equalityResolution?: PropertySchema["labelEqualityResolution"];
  equality: Array<string | ((currentLabels: Labels, newLabels: Labels) => any)>;
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
    const pattern = this.getValuePattern(curr);
    const labelPattern = this.getLabelPattern(curr);

    this.parsers.push({
      type: curr.type,
      name,
      pattern,
      validLabels: curr.validLabels,
      equality: labelPattern,
      equalityResolution: curr.labelEqualityResolution,
    });
  }

  private getValuePattern(curr: PropertySchema) {
    const pattern: PropertyParser<T>["pattern"] = [];

    switch (curr.type) {
      case "counter":
        pattern.push(
          (_content, _labels, oldValue) => (oldValue ? oldValue : 0) + 1
        );
        break;
      case "variable":
        // normalize instructions by splitting them by space and removing empty strings
        const instructions = curr.value
          .split(" ")
          .map((i) => i.trim())
          .filter((i) => !!i.length);
        for (const instruction of instructions) {
          if (instruction.startsWith("$")) {
            // if instruction starts with '$' we need to generate that property first to ensure
            // that a value exists before processing the current property when calling parse()
            const nm = instruction.slice(1);
            this.generatePropertyParser(nm);
            pattern.push((_, values) => values[nm]);
            continue;
          }
          if (instruction.startsWith("{") && instruction.endsWith("}")) {
            // if instruction is in between "{" "}" then we can assume that it is a property path
            // and we need to get the value of that property first before processing the current property

            pattern.push(
              generateDocumentPropertyMapper(
                instruction.slice(1, -1),
                curr.defaultValue
              )
            );
            continue;
          }
          // if instruction is not a property path or a reference to another property then its a normal value, we can just push it to the pattern
          pattern.push(instruction);
        }
        break;
    }
    return pattern;
  }

  private getLabelPattern(curr: PropertySchema) {
    // normalize labelEquality by splitting them by space and removing empty strings
    const equalityInstructions = curr.labelEquality
      .split(" ")
      .map((i) => i.trim())
      .filter((i) => !!i.length);

    const labelPattern: PropertyParser<T>["equality"] = [];

    for (const instruction of equalityInstructions) {
      if (instruction.startsWith("{") && instruction.endsWith("}")) {
        const [nm, prop] = instruction
          .slice(1, -1)
          .split(".")
          .map((i) => i.trim());
        labelPattern.push((currLabels, newLabels) =>
          nm === "currentLabels"
            ? `"${currLabels[prop]}"`
            : `"${newLabels[prop]}"`
        );
        continue;
      }
      labelPattern.push(instruction);
    }
    return labelPattern;
  }

  parse(content: T, labels: Labels): void {
    const values: Labels = {};
    this.parsers.forEach((g) => {
      const curr = this._properties.find((p) => p.name === g.name)!;
      const valueIndex = this.getLabelIndex(curr, g, labels);

      const result = executeOperation<string>(
        g.pattern,
        content,
        values,
        valueIndex >= 0 ? curr.values[valueIndex].value : undefined
      );

      values[g.name] = result;

      if (valueIndex >= 0) {
        if (g.equalityResolution === "ignore") {
          return;
        }
        if (g.equalityResolution === "replace") {
          curr.values[valueIndex].labels = this.getValidLabels(
            labels,
            g.validLabels
          );
          curr.values[valueIndex].value = result;
          return;
        }
      }

      curr.values.push({
        labels: this.getValidLabels(labels, g.validLabels),
        value: result,
      });
    });
  }

  private getValidLabels(labels: Labels, validLabels?: string[]) {
    const valid: Labels = {};
    validLabels?.forEach((l) => {
      valid[l] = labels[l];
    });
    return valid;
  }
  private getLabelIndex(
    property: Property,
    p: PropertyParser<T>,
    labels: Labels
  ): number {
    for (let index = 0; index < property.values.length; index++) {
      const oldLabels = property.values[index].labels;

      if (!p.equality.length) continue;

      const equal = executeOperation<boolean>(p.equality, oldLabels, labels);

      if (!equal) {
        continue;
      }
      return index;
    }
    return -1;
  }
}
