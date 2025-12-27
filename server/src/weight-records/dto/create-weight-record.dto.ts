import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWeightRecordDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0.1)
  weight: number;
}
