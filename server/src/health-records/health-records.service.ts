// health-records.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';

type HealthRecordType = 'VACUNA' | 'CHEQUEO' | 'TRATAMIENTO';

@Injectable()
export class HealthRecordsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createHealthRecordDto: CreateHealthRecordDto,
    files?: Express.Multer.File[],
  ) {
    let documentUrls: string[] = [];

    // Subir archivos a Cloudinary si existen
    if (files && files.length > 0) {
      documentUrls = await this.cloudinaryService.uploadMultipleFiles(
        files,
        'health-records',
      );
    }

    // Si hay URLs proporcionadas directamente en el DTO, agregarlas
    if (
      createHealthRecordDto.document_urls &&
      createHealthRecordDto.document_urls.length > 0
    ) {
      documentUrls = [...documentUrls, ...createHealthRecordDto.document_urls];
    }

    // Preparar fechas
    const firstDate = createHealthRecordDto.first_date
      ? new Date(createHealthRecordDto.first_date)
      : undefined;

    const secondDate = createHealthRecordDto.second_date
      ? new Date(createHealthRecordDto.second_date)
      : undefined;

    // Crear el registro de salud con la relación pet
    const healthRecord = await this.prisma.healthRecord.create({
      data: {
        pet_id: createHealthRecordDto.pet_id,
        type: createHealthRecordDto.type,
        description: createHealthRecordDto.description,
        vet_name: createHealthRecordDto.vet_name,
        first_date: firstDate,
        second_date: secondDate,
        document_urls: documentUrls,
      },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            photo_url: true,
            specie: true,
            breed: true,
            age: true,
          },
        },
      },
    });

    // Crear recordatorio automático
    const typeMap: Record<
      HealthRecordType,
      'VACUNA' | 'TRATAMIENTO' | 'VISITA'
    > = {
      VACUNA: 'VACUNA',
      CHEQUEO: 'VISITA',
      TRATAMIENTO: 'TRATAMIENTO',
    };

    const reminderType = typeMap[createHealthRecordDto.type];
    const reminderTitle = `Recordatorio: ${createHealthRecordDto.description || createHealthRecordDto.type}`;

    await this.prisma.reminder.create({
      data: {
        pet_id: createHealthRecordDto.pet_id,
        title: reminderTitle,
        type: reminderType,
        date: firstDate || new Date(),
        is_completed: false,
        is_urgent: false,
      },
    });

    return healthRecord;
  }

  async findAll() {
    return await this.prisma.healthRecord.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            photo_url: true,
            specie: true,
            breed: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const record = await this.prisma.healthRecord.findUnique({
      where: { id },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            photo_url: true,
            specie: true,
            breed: true,
            age: true,
        
          },
        },
      },
    });

    if (!record) {
      throw new NotFoundException('Health record not found');
    }

    return record;
  }

  async findByPet(petId: string) {
    return await this.prisma.healthRecord.findMany({
      where: { pet_id: petId },
      orderBy: { created_at: 'desc' },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            photo_url: true,
            specie: true,
            breed: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    updateHealthRecordDto: UpdateHealthRecordDto,
    files?: Express.Multer.File[],
  ) {
    const record = await this.prisma.healthRecord.findUnique({
      where: { id },
      include: { pet: true },
    });

    if (!record) throw new NotFoundException('Health record not found');

    let documentUrls = record.document_urls || [];

    // Subir nuevos archivos si existen
    if (files && files.length > 0) {
      const uploadedUrls = await this.cloudinaryService.uploadMultipleFiles(
        files,
        'health-records',
      );
      documentUrls = [...documentUrls, ...uploadedUrls];
    }

    // Si se proporcionan nuevas URLs en el DTO, reemplazar completamente
    if (updateHealthRecordDto.document_urls !== undefined) {
      documentUrls = updateHealthRecordDto.document_urls;
    }

    // Preparar fechas para actualización
    const data: any = {
      ...updateHealthRecordDto,
      document_urls: documentUrls,
    };

    // Solo actualizar fechas si se proporcionan
    if (updateHealthRecordDto.first_date !== undefined) {
      data.first_date = updateHealthRecordDto.first_date
        ? new Date(updateHealthRecordDto.first_date)
        : null;
    }

    if (updateHealthRecordDto.second_date !== undefined) {
      data.second_date = updateHealthRecordDto.second_date
        ? new Date(updateHealthRecordDto.second_date)
        : null;
    }

    // Eliminar propiedades undefined para no sobreescribir con null
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });

    return await this.prisma.healthRecord.update({
      where: { id },
      data,
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            photo_url: true,
            specie: true,
            breed: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const record = await this.prisma.healthRecord.findUnique({
      where: { id },
      include: { pet: true },
    });

    if (!record) {
      throw new NotFoundException('Health record not found');
    }

    // Eliminar archivos de Cloudinary si existen
    if (record.document_urls && record.document_urls.length > 0) {
      try {
        await this.cloudinaryService.deleteFiles(record.document_urls);
      } catch (error) {
        console.error('Error deleting files from Cloudinary:', error);
        // Continuar con la eliminación del registro aunque falle la eliminación de archivos
      }
    }

    // Usar transacción para asegurar que ambas eliminaciones se completen
    return await this.prisma.$transaction(async (prisma) => {
      // Buscar el recordatorio asociado más precisamente
      const reminder = await prisma.reminder.findFirst({
        where: {
          AND: [
            { pet_id: record.pet_id },
            {
              OR: [
                { title: { contains: record.type } },
                {
                  title: {
                    contains: record.description?.substring(0, 30) || '',
                  },
                },
              ],
            },
            // Buscar por fecha cercana (mismo día)
            record.first_date
              ? {
                  date: {
                    gte: new Date(
                      record.first_date.getTime() - 24 * 60 * 60 * 1000,
                    ), // 24 horas antes
                    lte: new Date(
                      record.first_date.getTime() + 24 * 60 * 60 * 1000,
                    ), // 24 horas después
                  },
                }
              : {},
          ],
        },
      });

      // Eliminar el recordatorio si existe
      if (reminder) {
        await prisma.reminder.delete({
          where: { id: reminder.id },
        });
      }

      // Finalmente eliminar el registro de salud
      return await prisma.healthRecord.delete({
        where: { id },
      });
    });
  }
}
