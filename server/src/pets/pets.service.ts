import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PetsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // ------------------- CREATE  -------------------
  async create(
    createPetDto: CreatePetDto,
    file: Express.Multer.File,
    userId: string,
  ) {
    let photo_url: string | null = null;

    if (file) {
      console.log('Subiendo imagen a Cloudinary...');
      photo_url = await this.cloudinaryService.uploadImage(file, 'pets');
      console.log('Imagen subida:', photo_url);
    }

    console.log('Creando pet en BD con owner_id:', userId);

    return await this.prisma.pet.create({
      data: {
        ...createPetDto,
        photo_url,
        owner_id: userId,
      },
    });
  }

  // ---------------------- FIND ALL BY USER ---------------------
  async findAllByUser(ownerId: string) {
    return await this.prisma.pet.findMany({
      where: { owner_id: ownerId },
      include: {
        health_records: true,
        nutrition_records: true,
        reminders: true,
        weight_records: true,
      },
    });
  }

  // ---------------------- FIND ONE ----------------------
  async findOne(id: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id },
      include: {
        health_records: true,
        nutrition_records: true,
        reminders: true,
        weight_records: true,
      },
    });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return pet;
  }

  // ---------------------- UPDATE WITH IMAGES ----------------------
  async updateWithImages(
    id: string,
    updatePetDto: UpdatePetDto,
    file?: Express.Multer.File,
  ) {
    let photo_url: string | undefined;

    // Si se envía una nueva imagen, subirla a Cloudinary
    if (file) {
      photo_url = await this.cloudinaryService.uploadImage(file, 'pets');
    }

  return await this.prisma.pet.update({
    where: { id },
    data: {
      ...updatePetDto,
      ...(photo_url && { photo_url }),
    },
    include: {
      health_records: true,
      nutrition_records: true,
      reminders: true,
      weight_records: true,
    },
  });
}

  // ---------------------- DELETE ----------------------
  async remove(id: string) {
    return await this.prisma.pet.delete({
      where: { id },
    });
  }
}
