import { Injectable } from '@nestjs/common';
import { Slurper } from 'src/services/parsers/slurper';
import { ParsingSchema } from 'src/models/schema';
import * as path from 'path';
import * as fs from 'fs';
@Injectable()
export class JunitSlurper extends Slurper {
  constructor() {
    const fileStr = fs.readFileSync(
      path.join(__dirname, '../../junit-schema.json'),
    );

    const schema = JSON.parse(fileStr.toString());

    super(schema as ParsingSchema);
  }
}
