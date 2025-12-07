import { IsString, IsOptional, IsInt, IsUUID, Min, Max, MaxLength, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNutritionRecordDto {

    @ApiProperty({
        description: 'ID de la mascota asociada al registro nutricional',
        example: '8b3e1a49-3f3b-452a-a374-4ccc99af4a13',
    })
    @IsUUID()
    pet_id: string;

    @ApiProperty({
        description: 'Tipo de alimento (Croquetas, Comida húmeda, BARF, Casera, etc.)',
        example: 'Croquetas',
    })
    @IsString()
    @MaxLength(100)
    food_type: string;

    @ApiProperty({
        description: 'Marca del alimento',
        example: 'Royal Canin',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    food_brand?: string;

    @ApiProperty({
        description: 'Número de comidas diarias',
        example: 3,
        minimum: 1,
        maximum: 10,
    })
    @IsInt()
    @Min(1, { message: 'El número de comidas diarias debe ser al menos 1' })
    @Max(10, { message: 'El número de comidas diarias no puede ser mayor a 10' })
    daily_meals: number;

    @ApiProperty({
        description: 'Tamaño de la porción (ej: 200g, 1 taza, 1/2 lata)',
        example: '200g',
    })
    @IsString()
    @MaxLength(50)
    portion_size: string;

    @ApiProperty({
        description: 'Notas adicionales sobre la alimentación',
        example: 'Alimento especial para perros con sensibilidad digestiva',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    notes?: string;

    @IsOptional()
  @IsArray()
  @IsString({ each: true })
  meal_times?: string[];
}
