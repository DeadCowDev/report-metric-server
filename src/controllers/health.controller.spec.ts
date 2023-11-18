import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [],
    }).compile();

    controller = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return "ok"', () => {
      expect(controller.healthy()).toBe('ok');
    });
  });
});
