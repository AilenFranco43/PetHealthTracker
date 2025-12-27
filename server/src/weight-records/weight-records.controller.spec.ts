import { Test, TestingModule } from '@nestjs/testing';
import { WeightRecordsController } from './weight-records.controller';
import { WeightRecordsService } from './weight-records.service';

describe('WeightRecordsController', () => {
  let controller: WeightRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeightRecordsController],
      providers: [WeightRecordsService],
    }).compile();

    controller = module.get<WeightRecordsController>(WeightRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
