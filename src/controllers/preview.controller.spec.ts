import { Test, TestingModule } from '@nestjs/testing';
import { PreviewController } from './preview.controller';

describe('PreviewController', () => {
  let controller: PreviewController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PreviewController],
      providers: [],
    }).compile();

    controller = app.get<PreviewController>(PreviewController);
  });

  describe('root', () => {
    it('should return "ok"', () => {
      expect(controller.previewXml({})).toBe({});
    });
  });
});
