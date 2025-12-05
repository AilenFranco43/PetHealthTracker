import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthRecordsService } from './health-records.service';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';

@Controller('health-records')
export class HealthRecordsController {
  constructor(private readonly healthRecordsService: HealthRecordsService) {}

  @Post()
  create(@Body() createHealthRecordDto: CreateHealthRecordDto) {
    return this.healthRecordsService.create(createHealthRecordDto);
  }

  @Get()
  findAll() {
    return this.healthRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthRecordsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHealthRecordDto: UpdateHealthRecordDto,
  ) {
    return this.healthRecordsService.update(id, updateHealthRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthRecordsService.remove(id);
  }
}
