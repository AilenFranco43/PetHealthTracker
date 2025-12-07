import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReminderType } from '@prisma/client';
import { Type } from 'class-transformer';


export class CreateReminderDto {
  @ApiProperty({
    description: 'ID de la mascota asociada al recordatorio',
    example: '8b3e1a49-3f3b-452a-a374-4ccc99af4a13',
  })
  @IsUUID()
  @IsNotEmpty()
  pet_id: string;

  @ApiProperty({
    description: 'Título del recordatorio',
    example: 'Vacuna anual',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Tipo del recordatorio', example: 'Vacuna' })
  @IsEnum(ReminderType)
  type: ReminderType;

  @ApiProperty({
    description: 'Fecha y hora del recordatorio en formato ISO 8601',
    example: '2023-12-31T10:00:00Z',
  })
@IsOptional()
@IsDateString()
date?: string;


  @ApiProperty({
    description: 'Indica si el recordatorio ha sido completado',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_completed?: boolean;

  @ApiProperty({
    description: 'Indica si el recordatorio es urgente',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_urgent?: boolean;

  @ApiProperty({
    description: 'Indica si el recordatorio es de rutina',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_routine?: boolean;

  @ApiProperty({
    description: 'Horarios del recordatorio (HH:mm)',
    example: ['08:00', '16:30'],
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  times?: string[];
}
