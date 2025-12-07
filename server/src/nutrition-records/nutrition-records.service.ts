import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNutritionRecordDto } from './dto/create-nutrition-record.dto';
import { UpdateNutritionRecordDto } from './dto/update-nutrition-record.dto';

@Injectable()
export class NutritionRecordsService {

  constructor(private readonly prisma: PrismaService) { }

  /**
   * Crear un nuevo registro nutricional
   * @param createNutritionRecordDto - Datos del registro a crear
   * @returns Registro nutricional creado
   */















async create(createNutritionRecordDto: CreateNutritionRecordDto) {
  // 1️⃣ Validar que la mascota existe
  const petExists = await this.prisma.pet.findUnique({
    where: { id: createNutritionRecordDto.pet_id },
  });

  if (!petExists) {
    throw new NotFoundException(`Mascota con ID ${createNutritionRecordDto.pet_id} no encontrada`);
  }

  // 2️⃣ Crear el registro nutricional
  const nutritionRecord = await this.prisma.nutritionRecord.create({
    data: createNutritionRecordDto,
  });

  // 3️⃣ Crear UN recordatorio de alimentación rutinaria
  if (createNutritionRecordDto.meal_times && createNutritionRecordDto.meal_times.length > 0) {
    await this.prisma.reminder.create({
      data: {
        pet_id: createNutritionRecordDto.pet_id,
        title: 'Recordatorio de alimentación',
        type: 'ALIMENTACION',
        is_routine: true,
        is_completed: false,
        is_urgent: false,
        // guardamos todos los horarios
        times: createNutritionRecordDto.meal_times,

      },
    });
  }

  return nutritionRecord;
}







  /**
   * Obtener todos los registros nutricionales
   * @param petId - ID opcional de la mascota para filtrar
   * @returns Array de registros nutricionales
   */
  async findAll(petId?: string) {
    const where = petId ? { pet_id: petId } : {};

    return await this.prisma.nutritionRecord.findMany({
      where,
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            specie: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  /**
   * Obtener un registro nutricional por ID
   * @param id - UUID del registro
   * @returns Registro nutricional encontrado
   */
  async findOne(id: string) {
    const record = await this.prisma.nutritionRecord.findUnique({
      where: { id },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            specie: true,
            breed: true,
          },
        },
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro nutricional con ID ${id} no encontrado`);
    }

    return record;
  }

  /**
   * Obtener todos los registros nutricionales de una mascota específica
   * @param petId - UUID de la mascota
   * @returns Array de registros nutricionales de la mascota
   */
  async findByPetId(petId: string) {
    // Validar que la mascota existe
    const petExists = await this.prisma.pet.findUnique({
      where: { id: petId },
    });

    if (!petExists) {
      throw new NotFoundException(`Mascota con ID ${petId} no encontrada`);
    }

    return await this.prisma.nutritionRecord.findMany({
      where: { pet_id: petId },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  /**
   * Actualizar un registro nutricional
   * @param id - UUID del registro
   * @param updateNutritionRecordDto - Datos a actualizar
   * @returns Registro nutricional actualizado
   */
async update(id: string, updateNutritionRecordDto: UpdateNutritionRecordDto) {
  // Validar existencia
  await this.findOne(id);

  // Validar nuevo pet_id si se actualiza
  if (updateNutritionRecordDto.pet_id) {
    const petExists = await this.prisma.pet.findUnique({
      where: { id: updateNutritionRecordDto.pet_id },
    });
    if (!petExists) throw new NotFoundException(`Mascota con ID ${updateNutritionRecordDto.pet_id} no encontrada`);
  }

  // Actualizar campos, incluidos meal_times
  return await this.prisma.nutritionRecord.update({
    where: { id },
    data: updateNutritionRecordDto,
  });
}


  /**
   * Eliminar un registro nutricional
   * @param id - UUID del registro
   * @returns Registro nutricional eliminado
   */
  async remove(id: string) {
    // Validar que el registro existe
    await this.findOne(id);

    return await this.prisma.nutritionRecord.delete({
      where: { id },
    });
  }
}
