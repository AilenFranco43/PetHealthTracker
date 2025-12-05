import { IsString, IsOptional, IsEnum, IsArray, IsDateString } from 'class-validator';
import { HealthRecordType } from '@prisma/client';

export class UpdateHealthRecordDto {
  @IsOptional()
  @IsString()
  pet_id?: string;

  @IsOptional()
  @IsEnum(HealthRecordType)
  type?: HealthRecordType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  first_date?: string;

  @IsOptional()
  @IsDateString()
  second_date?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  document_urls?: string[];

  @IsOptional()
  @IsString()
  vet_name?: string;
}
