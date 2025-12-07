import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Injectable()
export class RemindersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReminderDto: CreateReminderDto, userId: string) {
    // Verificar que la mascota pertenezca al usuario
    const pet = await this.prisma.pet.findFirst({
      where: {
        id: createReminderDto.pet_id,
        owner_id: userId, // Verificar propiedad
      },
    });

    if (!pet) {
      throw new ForbiddenException('No tienes permiso para crear recordatorios para esta mascota');
    }

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
            photo_url: true,
          },
        },
      },
    });
  }

  async findAll(userId: string) {
    console.log('🔍 Buscando recordatorios para usuario ID:', userId); // Para debug

    return await this.prisma.reminder.findMany({
      where: {
        pet: {
          owner_id: userId, 
        },
      },
      orderBy: { date: 'asc' },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            photo_url: true,
            specie: true,
          },
        },
      },
    });
  }

  async findOneById(id: string, userId: string) {
    const reminder = await this.prisma.reminder.findFirst({
      where: {
        id,
        pet: {
          owner_id: userId, 
        },
      },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            photo_url: true,
          },
        },
      },
    });

    if (!reminder) {
      throw new NotFoundException('Recordatorio no encontrado o no tienes permiso para verlo');
    }

    return reminder;
  }

  async update(id: string, updateReminderDto: UpdateReminderDto, userId: string) {
    // Verificar que el recordatorio pertenezca al usuario
    const reminder = await this.prisma.reminder.findFirst({
      where: {
        id,
        pet: {
          owner_id: userId,
        },
      },
    });

    if (!reminder) {
      throw new ForbiddenException('No tienes permiso para actualizar este recordatorio');
    }

    return await this.prisma.reminder.update({
      where: { id },
      data: updateReminderDto,
    });
  }

  async remove(id: string, userId: string) {
    // Verificar que el recordatorio pertenezca al usuario
    const reminder = await this.prisma.reminder.findFirst({
      where: {
        id,
        pet: {
          owner_id: userId,
        },
      },
    });

    if (!reminder) {
      throw new ForbiddenException('No tienes permiso para eliminar este recordatorio');
    }

    return await this.prisma.reminder.delete({
      where: { id },
    });
  }
}