import { Test, TestingModule } from '@nestjs/testing';
import { SlurpJunitController } from './controller';
import { AppService } from './junit-parser.service';

describe('SlurpJunitController', () => {
  let slurpJunitController: SlurpJunitController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SlurpJunitController],
      providers: [AppService],
    }).compile();

    slurpJunitController = app.get<SlurpJunitController>(SlurpJunitController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(slurpJunitController.parseToPrometheus()).toBe('Hello World!');
    });
  });
});
