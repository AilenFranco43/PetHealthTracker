import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { HealthRecordsModule } from './health-records/health-records.module';
import { RemindersModule } from './reminders/reminders.module';
import { NutritionRecordsModule } from './nutrition-records/nutrition-records.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { WeightRecordsModule } from './weight-records/weight-records.module';

@Module({
  imports: [
    UsersModule,
    PetsModule,
    HealthRecordsModule,
    RemindersModule,
    NutritionRecordsModule,
    PrismaModule,
    AuthModule,
    CloudinaryModule,
    WeightRecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
