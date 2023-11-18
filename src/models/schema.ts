export interface ParsingSchema {
  [k: string]: PropertySchema;
}

export interface PropertySchema {
  type: 'variable' | 'counter';
  description: string;
  value: string;
  labelEquality: string;
  labelEqualityResolution: 'replace' | 'add';
}
