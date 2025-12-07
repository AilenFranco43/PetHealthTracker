import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Injectable()
export class RemindersService {
  constructor(private readonly prisma: PrismaService) {}

async create(createReminderDto: CreateReminderDto) {
  const data: any = {
    ...createReminderDto,
    times: createReminderDto.times ?? [],
    date: createReminderDto.date ? new Date(createReminderDto.date) : null,
  };

  return await this.prisma.reminder.create({
    data,
    include: {
      pet: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}



  async findAll() {
    return await this.prisma.reminder.findMany({
      orderBy: { date: 'asc' },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOneById(id: string) {
    const reminder = await this.prisma.reminder.findUnique({
      where: { id },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }

    return reminder;
  }

  async update(id: string, updateReminderDto: UpdateReminderDto) {
    const exists = await this.prisma.reminder.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException('Reminder not found');
    }

    return await this.prisma.reminder.update({
      where: { id },
      data: updateReminderDto,
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.reminder.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException('Reminder not found');
    }

    return await this.prisma.reminder.delete({
      where: { id },
    });
  }
}
