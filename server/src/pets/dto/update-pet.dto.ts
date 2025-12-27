import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, MaxLength, IsUUID, IsUrl } from 'class-validator';
import { Type as TransformType } from 'class-transformer';
export class UpdatePetDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  age?: string;


  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  specie?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  breed?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({ required: false })
  photo_url?: string;
}
