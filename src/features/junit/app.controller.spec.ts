import { Test, TestingModule } from '@nestjs/testing';
import { SlurpJunitController } from './controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: SlurpJunitController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SlurpJunitController],
      providers: [AppService],
    }).compile();

    appController = app.get<SlurpJunitController>(SlurpJunitController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
