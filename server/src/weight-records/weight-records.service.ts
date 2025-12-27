import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWeightRecordDto } from './dto/create-weight-record.dto';

@Injectable()
export class WeightRecordsService {
  constructor(private prisma: PrismaService) {}

 async create(petId: string, dto: CreateWeightRecordDto) {
  const record = await this.prisma.weightRecord.create({
    data: {
      pet_id: petId,
      weight: dto.weight,
    },
  });

  return record;
}


  async findByPet(petId: string) {
    return this.prisma.weightRecord.findMany({
      where: { pet_id: petId },
      orderBy: { recorded_at: 'desc' },
    });
  }

  async findLatest(petId: string) {
    return this.prisma.weightRecord.findFirst({
      where: { pet_id: petId },
      orderBy: { recorded_at: 'desc' },
    });
  }

  async getHistory(petId: string) {
  const records = await this.prisma.weightRecord.findMany({
    where: { pet_id: petId },
    orderBy: { recorded_at: 'asc' },
    select: {
      recorded_at: true,
      weight: true,
    },
  });

  return records.map(r => ({
    date: r.recorded_at.toISOString().split('T')[0],
    weight: r.weight,
  }));
}


  async remove(id: string, petId: string) {
  return this.prisma.weightRecord.deleteMany({
    where: { id, pet_id: petId },
  });
}

}
