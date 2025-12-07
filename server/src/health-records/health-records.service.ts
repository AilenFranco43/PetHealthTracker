import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';
import { HealthRecordType } from '@prisma/client';

@Injectable()
export class HealthRecordsService {
  constructor(private readonly prisma: PrismaService) {}

async create(createHealthRecordDto: CreateHealthRecordDto) {

  const healthRecord = await this.prisma.healthRecord.create({
    data: {
      ...createHealthRecordDto,
      first_date: createHealthRecordDto.first_date
        ? new Date(createHealthRecordDto.first_date)
        : undefined,
      second_date: createHealthRecordDto.second_date
        ? new Date(createHealthRecordDto.second_date)
        : undefined,
    },
  });


  const typeMap: Record<HealthRecordType, 'VACUNA' | 'TRATAMIENTO' | 'VISITA'> = {
    VACUNA: 'VACUNA',
    CHEQUEO: 'VISITA',
    TRATAMIENTO: 'TRATAMIENTO',
  };

  const reminderType = typeMap[createHealthRecordDto.type];

  
  await this.prisma.reminder.create({
    data: {
      pet_id: createHealthRecordDto.pet_id,
      title: `Recordatorio: ${createHealthRecordDto.type}`,
      type: reminderType,
      date: createHealthRecordDto.first_date
        ? new Date(createHealthRecordDto.first_date)
        : new Date(),
      is_completed: false,
      is_urgent: false,
    },
  });

  return healthRecord;
}



  async findAll() {
    return await this.prisma.healthRecord.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: string) {
    const record = await this.prisma.healthRecord.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException('Health record not found');
    }

    return record;
  }

  async update(id: string, updateHealthRecordDto: UpdateHealthRecordDto) {
    const record = await this.prisma.healthRecord.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException('Health record not found');
    }

    return await this.prisma.healthRecord.update({
      where: { id },
      data: updateHealthRecordDto,
    });
  }

  async remove(id: string) {
    const record = await this.prisma.healthRecord.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException('Health record not found');
    }

    return await this.prisma.healthRecord.delete({
      where: { id },
    });
  }
}
