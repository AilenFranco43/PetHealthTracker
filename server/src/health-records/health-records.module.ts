import { Module } from '@nestjs/common';
import { HealthRecordsService } from './health-records.service';
import { HealthRecordsController } from './health-records.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [CloudinaryModule, PrismaModule],
  controllers: [HealthRecordsController],
  providers: [HealthRecordsService],
})
export class HealthRecordsModule {}
