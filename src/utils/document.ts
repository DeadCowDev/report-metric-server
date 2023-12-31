import * as docPath from "doc-path";
const operationMap = {
  Length: (content: unknown) => (Array.isArray(content) ? content.length : 0),
  Abs: (content: unknown) => Math.abs((content as number) || 0),
  Floor: (content: unknown) => Math.floor((content as number) || 0),
  Round: (content: unknown) => Math.round((content as number) || 0),
  Int: (content: unknown) => parseInt((content as string) || "0"),
  Flat: (content: unknown) => (Array.isArray(content) ? content.flat() : []),
  Keys: (content: unknown) => Object.keys(content || {}),
  Values: (content: unknown) => Object.values(content || {}),
  Max: (content: unknown) => {
    if (!Array.isArray(content)) return 0;
    return Math.max(...content);
  },
  Min: (content: unknown) => {
    if (!Array.isArray(content)) return 0;
    return Math.min(...content);
  },
  Avg: (content: unknown) => {
    if (!Array.isArray(content)) return 0;
    return content.reduce((acc, curr) => acc + curr, 0) / content.length;
  },
};

type Operation = (content: unknown) => any;

export function generateDocumentPropertyMapper(
  instruction: string,
  defaultValue: any
): (content: any) => any {
  const operations: Operation[] = processInstruction(instruction, defaultValue);

  return (content) => {
    return operations.reduce((acc, op) => op(acc), content);
  };
}

function processInstruction(
  instruction: string,
  defaultValue: any
): Operation[] {
  const hasOperation =
    instruction.indexOf("(") >= 0 && instruction.indexOf(")") >= 0;

  if (!hasOperation) {
    return [
      (content) => docPath.evaluatePath(content, instruction) ?? defaultValue,
    ];
  }
  const indexOfStart = instruction.indexOf("(");
  const indexOfEnd = instruction.lastIndexOf(")");
  const operation = instruction.substring(0, indexOfStart);

  if (!operationMap[operation]) {
    throw new Error(
      `Operation ${operation} is not supported. Allowed operations are: ${Object.keys(
        operationMap
      ).join(", ")}`
    );
  }
  const nextInstruction = instruction.substring(indexOfStart + 1, indexOfEnd);
  const nextOperations = processInstruction(nextInstruction, defaultValue);
  nextOperations.push(operationMap[operation]);
  return nextOperations;
}
