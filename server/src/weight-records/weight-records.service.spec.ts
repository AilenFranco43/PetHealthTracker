import { Test, TestingModule } from '@nestjs/testing';
import { WeightRecordsService } from './weight-records.service';

describe('WeightRecordsService', () => {
  let service: WeightRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightRecordsService],
    }).compile();

    service = module.get<WeightRecordsService>(WeightRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
