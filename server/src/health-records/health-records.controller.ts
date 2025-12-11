import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HealthRecordsService } from './health-records.service';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('health-records')
@UsePipes(new ValidationPipe({ transform: true }))
export class HealthRecordsController {
  constructor(private readonly healthRecordsService: HealthRecordsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('documents', 10)) // Máximo 10 archivos
  create(
    @Body() createHealthRecordDto: CreateHealthRecordDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB por archivo
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|pdf|doc|docx)$/ }), // Tipos permitidos
        ],
        fileIsRequired: false, // Los archivos son opcionales
      }),
    )
    files?: Express.Multer.File[],
  ) {
    return this.healthRecordsService.create(createHealthRecordDto, files);
  }

  @Get()
  findAll() {
    return this.healthRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthRecordsService.findOne(id);
  }

  @Get('pet/:petId')
  findByPet(@Param('petId') petId: string) {
    return this.healthRecordsService.findByPet(petId);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('documents', 10))
  update(
    @Param('id') id: string,
    @Body() updateHealthRecordDto: UpdateHealthRecordDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|pdf|doc|docx)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    files?: Express.Multer.File[],
  ) {
    return this.healthRecordsService.update(id, updateHealthRecordDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthRecordsService.remove(id);
  }
}
