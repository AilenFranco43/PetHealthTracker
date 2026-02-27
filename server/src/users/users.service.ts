import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/response-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return plainToInstance(UserResponseDto, user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return plainToInstance(UserResponseDto, users);
  }
 
  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return plainToInstance(UserResponseDto, user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return plainToInstance(UserResponseDto, user);
  }

  async remove(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return plainToInstance(UserResponseDto, user);
  }
}
