import Parser from 'morph-expressions';
const parser = new Parser();

export function executeOperation<T>(
  operation: Array<string | ((...args: any[]) => any)>,
  ...args: any[]
): T {
  const valueEquation = operation
    .map((instruction) =>
      typeof instruction === 'string' ? instruction : instruction(...args),
    )
    .join(' ');

  return parser.parseAndEval(valueEquation) as T;
}
