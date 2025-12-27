import {
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
  IsUrl,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePetDto {
  @ApiProperty({
    description: 'Nombre de la mascota',
    example: 'Luna',
  })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Edad aproximada de la mascota (en años)',
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsString()
  age?: string;

  @ApiProperty({
    description: 'Especie de la mascota (perro, gato, etc.)',
    example: 'perro',
  })
  @IsString()
  specie: string;

  @ApiProperty({
    description: 'Raza de la mascota',
    example: 'Labrador',
    required: false,
  })
  @IsOptional()
  @IsString()
  breed?: string;

  @ApiProperty({
    description: 'URL de foto de la mascota',
    example: 'https://misfotos.com/luna1.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  photo_url?: string;
}
