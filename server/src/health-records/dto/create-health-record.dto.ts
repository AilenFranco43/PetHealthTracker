import { IsString, IsOptional, IsEnum, IsArray, IsDateString } from 'class-validator';
import { HealthRecordType } from '@prisma/client';

export class CreateHealthRecordDto {
  @IsString()
  pet_id: string;

  @IsEnum(HealthRecordType)
  type: HealthRecordType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  first_date?: string;

  @IsOptional()
  @IsDateString()
  second_date?: string;

  @IsArray()
  @IsString({ each: true })
  document_urls: string[];

  @IsOptional()
  @IsString()
  vet_name?: string;
}
