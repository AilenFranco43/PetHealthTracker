import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';

@Injectable()
export class HealthRecordsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHealthRecordDto: CreateHealthRecordDto) {
    return await this.prisma.healthRecord.create({
      data: createHealthRecordDto,
    });
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
