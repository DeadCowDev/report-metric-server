import { Test, TestingModule } from '@nestjs/testing';
import { MetricsController } from './metrics.controller';

describe('MetricController', () => {
  let controller: MetricsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MetricsController],
      providers: [],
    }).compile();

    controller = app.get<MetricsController>(MetricsController);
  });

  describe('root', () => {
    it('should return "ok"', () => {
      expect(controller.asPrometheus()).toBe('ok');
    });
  });
});
