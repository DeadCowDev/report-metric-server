import { Test, TestingModule } from '@nestjs/testing';
import { SlurpController } from './slurp.controller';
import { ServicesModule } from 'src/services';

describe('SlurpController', () => {
  let controller: SlurpController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SlurpController],
      providers: [],
      imports: [ServicesModule],
    }).compile();

    controller = app.get<SlurpController>(SlurpController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.parseJunit({}, {})).toBe('Hello World!');
    });
  });
});
