import * as fs from "fs";
import * as path from "path";
import { ParsingSchema } from "../../models/schema";
import { Slurper } from "./slurper";

export class VegetaSlurper extends Slurper {
  constructor(filePath?: string) {
    const fileLocation =
      filePath || path.join(__dirname, "../../schemas/vegeta-schema.json");
    const fileStr = fs.readFileSync(fileLocation);

    const schema = JSON.parse(fileStr.toString());
    super(schema as ParsingSchema);
  }
}
