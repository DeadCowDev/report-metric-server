export interface ParsingSchema {
  [k: string]: PropertySchema;
}

export interface PropertySchema {
  type: 'variable' | 'counter';
  description: string;
  value: string;
  validLabels?: string[];
  labelEquality: string;
  labelEqualityResolution: 'replace' | 'add' | 'ignore';
}
