import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('recordatorios')
@ApiBearerAuth()
@Controller('reminders')
@UseGuards(JwtAuthGuard)
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo recordatorio' })
  @ApiResponse({ status: 201, description: 'Recordatorio creado exitosamente' })
  @ApiResponse({ status: 403, description: 'No tienes permiso para esta mascota' })
  create(@Body() createReminderDto: CreateReminderDto, @Request() req) {
    console.log('📝 Creando recordatorio para usuario:', req.user); // Debug
    return this.remindersService.create(createReminderDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los recordatorios del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de recordatorios del usuario' })
  findAll(@Request() req) {
    console.log('👤 Usuario solicitando recordatorios:', req.user); // Debug
    return this.remindersService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un recordatorio específico' })
  @ApiResponse({ status: 200, description: 'Recordatorio encontrado' })
  @ApiResponse({ status: 404, description: 'Recordatorio no encontrado' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.remindersService.findOneById(id, req.user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un recordatorio' })
  @ApiResponse({ status: 200, description: 'Recordatorio actualizado' })
  @ApiResponse({ status: 403, description: 'No tienes permiso para actualizar' })
  update(
    @Param('id') id: string,
    @Body() updateReminderDto: UpdateReminderDto,
    @Request() req,
  ) {
    return this.remindersService.update(id, updateReminderDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un recordatorio' })
  @ApiResponse({ status: 200, description: 'Recordatorio eliminado' })
  @ApiResponse({ status: 403, description: 'No tienes permiso para eliminar' })
  remove(@Param('id') id: string, @Request() req) {
    return this.remindersService.remove(id, req.user.userId);
  }
}