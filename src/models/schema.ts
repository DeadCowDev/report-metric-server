export interface ParsingSchema {
  [k: string]: PropertySchema;
}

export interface PropertySchema {
  type: 'variable' | 'counter';
  description: string;
  value: string;
  equality: string;
  equalityResolution: 'replace' | 'add';
}
