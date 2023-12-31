export interface ParsingSchema {
  [k: string]: PropertySchema;
}

export interface PropertySchema {
  type: "variable" | "counter" | "quantile";
  quantiles?: string[];
  description: string;
  value: string;
  validLabels?: string[];
  defaultValue?: any;
  labelEquality: string;
  labelEqualityResolution: "replace" | "add" | "ignore";
}
