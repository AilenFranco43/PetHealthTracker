import { ApiProperty } from '@nestjs/swagger';

export class ResponseNutritionRecordDto {
  @ApiProperty({
    description: 'ID único del registro nutricional',
    example: '7c2a5f8d-4b3e-4a1c-9d7f-8e3b4a5c6d7e',
  })
  id: string;

  @ApiProperty({
    description: 'ID de la mascota asociada',
    example: '8b3e1a49-3f3b-452a-a374-4ccc99af4a13',
  })
  pet_id: string;

  @ApiProperty({
    description: 'Tipo de alimento',
    example: 'Croquetas',
  })
  food_type: string;

  @ApiProperty({
    description: 'Marca del alimento',
    example: 'Royal Canin',
    nullable: true,
  })
  food_brand: string | null;

  @ApiProperty({
    description: 'Número de comidas diarias',
    example: 3,
  })
  daily_meals: number;

  @ApiProperty({
    description: 'Tiempos de las comidas',
    example: ['08:00', '12:00', '18:00'],
  })
  meal_times?: string[];

  @ApiProperty({
    description: 'Tamaño de la porción',
    example: '200g',
  })
  portion_size: string;

  @ApiProperty({
    description: 'Notas adicionales',
    example: 'Alimento especial para perros con sensibilidad digestiva',
    nullable: true,
  })
  notes: string | null;

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2024-01-15T10:30:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2024-01-15T10:30:00.000Z',
  })
  updated_at: Date;
}
