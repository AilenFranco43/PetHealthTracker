import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WeightRecordsService } from './weight-records.service';
import { CreateWeightRecordDto } from './dto/create-weight-record.dto';

@Controller('pets/:petId/weight')
export class WeightRecordsController {
  constructor(private readonly weightRecordsService: WeightRecordsService) {}

  @Post()
  create(@Param('petId') petId: string, @Body() dto: CreateWeightRecordDto) {
    return this.weightRecordsService.create(petId, dto);
  }

  @Get()
  findAll(@Param('petId') petId: string) {
    return this.weightRecordsService.findByPet(petId);
  }

  @Get('latest')
  findLatest(@Param('petId') petId: string) {
    return this.weightRecordsService.findLatest(petId);
  }

  @Get('history')
  getHistory(@Param('petId') petId: string) {
    return this.weightRecordsService.getHistory(petId);
  }

  @Delete(':id')
  remove(@Param('petId') petId: string, @Param('id') id: string) {
    return this.weightRecordsService.remove(id, petId);
  }
}
