import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ResponsePetDto } from './dto/response-pet.dto';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  // --------------------- CREATE ---------------------
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: ResponsePetDto })
  @UseInterceptors(FileInterceptor('photo_url'))
  @ApiBody({ type: CreatePetDto })
  create(
    @Body() createPetDto: CreatePetDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Req() req: any,
  ) {
    const userId = req.user?.userId;

    if (!userId) {
      console.error('ERROR: No se encontró userId en req.user');
      throw new UnauthorizedException('Usuario no autenticado');
    }

    console.log('User ID from request:', userId);
    return this.petsService.create(createPetDto, file, userId);
  }

  // --------------------- FIND ALL BY OWNER ---------------------
  @Get()
  findAllByOwner(@Req() req: any) {
    const userId = req.user?.userId;

    if (!userId) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    return this.petsService.findAllByUser(userId);
  }

  // --------------------- FIND ONE ---------------------
  @Get(':id')
  @ApiOkResponse({ type: ResponsePetDto })
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  // --------------------- UPDATE ---------------------
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: ResponsePetDto })
  @UseInterceptors(FileInterceptor('photo_url'))
  @ApiBody({ type: UpdatePetDto })
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.petsService.updateWithImages(id, updatePetDto, file);
  }

  // --------------------- DELETE ---------------------
  @Delete(':id')
  @ApiOkResponse({ type: ResponsePetDto })
  remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }
}
