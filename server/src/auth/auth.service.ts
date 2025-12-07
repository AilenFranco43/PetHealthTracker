import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { createHash, randomBytes } from 'crypto';
import { addMinutes, isAfter } from 'date-fns';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto'; // Esta importación está correcta

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto, res: Response): Promise<{ message: string }> {
    const serializedEmail = this.serializeEmail(dto.email);
    const user = await this.usersService.findByEmail(serializedEmail);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const { accessToken, refreshToken } = this.generateTokens(
      user.id,
      user.email,
    );
    this.setAuthCookies(res, accessToken, refreshToken);

    return { message: 'Login exitoso' };
  }

  async register(
    dto: RegisterDto,
    res: Response,
  ): Promise<{ message: string }> {
    const serializedEmail = this.serializeEmail(dto.email);
    const existingUser = await this.usersService.findByEmail(serializedEmail);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await this.hashPassword(dto.password);
    const user = await this.usersService.create({
      username: dto.username,
      email: serializedEmail,
      password: hashedPassword,
    });

    this.emailService
      .sendWelcomeEmail(user.email, user.username)
      .catch((err) => {
        console.error('Error al enviar email de bienvenida:', err);
      });

    const { accessToken, refreshToken } = this.generateTokens(
      user.id,
      user.email,
    );
    this.setAuthCookies(res, accessToken, refreshToken);

    return { message: 'Registro exitoso' };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const serializedEmail = this.serializeEmail(dto.email);
    const user = await this.usersService.findByEmail(serializedEmail);

    if (!user) {
      return {
        message:
          'En tu correo electrónico recibirás instrucciones para restablecer tu contraseña.',
      };
    }
    const rawToken = randomBytes(32).toString('hex');

    const hashedToken = createHash('sha256').update(rawToken).digest('hex');

    await this.usersService.update(user.id, {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: addMinutes(new Date(), 15),
    });

    const frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:5173',
    );
    const resetLink = `${frontendUrl}/reset-password?token=${rawToken}`;

    await this.emailService.sendPasswordResetEmail(user.email, resetLink);

    return {
      message:
        'En tu correo electrónico recibirás instrucciones para restablecer tu contraseña.',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const hashedToken = createHash('sha256').update(dto.token).digest('hex');

    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: hashedToken,
      },
    });

    if (!user) {
      throw new ForbiddenException('Token inválido o expirado');
    }

    if (
      !user.resetPasswordExpires ||
      isAfter(new Date(), user.resetPasswordExpires)
    ) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          resetPasswordToken: null,
          resetPasswordExpires: null,
        },
      });
      throw new ForbiddenException('Token inválido o expirado');
    }

    const hashedPassword = await this.hashPassword(dto.newPassword);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return { message: 'Contraseña actualizada correctamente' };
  }

  refreshTokens(
    userId: string,
    email: string,
    res: Response,
  ): { message: string } {
    const { accessToken, refreshToken } = this.generateTokens(userId, email);
    this.setAuthCookies(res, accessToken, refreshToken);
    return { message: 'Sesión renovada correctamente' };
  }

  async getCurrentUser(userId: string) {
    return this.usersService.findOne(userId);
  }

  private generateTokens(
    userId: string,
    email: string,
  ): { accessToken: string; refreshToken: string } {
    const payload = { sub: userId, email };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '2h', // para access token
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d', // 7 días para refresh token
    });
    return { accessToken, refreshToken };
  }

  private setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ): void {
    const isProduction = this.configService.get('NODE_ENV') === 'production';

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 2 * 60 * 60 * 1000, // 2 horas
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });
  }

  private serializeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  }





async validateUser(email: string, password: string): Promise<any> {
  const serializedEmail = this.serializeEmail(email);
  const user = await this.usersService.findByEmail(serializedEmail);

  if (!user || !user.password) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    return null;
  }

  // No devolver la contraseña
  const { password: _, ...result } = user;
  return result;
}


















async googleLogin(
  googleUser: any,
  res: Response,
): Promise<{
  message: string;
  user: { id: string; email: string; username: string };
}> {
  if (!googleUser) {
    throw new UnauthorizedException('Google user not found');
  }

  // Buscar usuario existente - usa Prisma directamente para obtener User
  let user = await this.prisma.user.findUnique({
    where: { email: googleUser.email },
  });

  // Si no existe, crearlo
  if (!user) {
    const createUserDto: CreateUserDto = {
      email: googleUser.email,
      username: googleUser.username || googleUser.displayName || googleUser.email.split('@')[0],
      provider: 'google',
      photo_url: googleUser.picture,
      password: undefined,
    };

    // Crea usando Prisma directamente

    user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        provider: createUserDto.provider,
        photo_url: createUserDto.photo_url,
        password: createUserDto.password,
      },
    });
  }

  // Generar tokens
  const { accessToken, refreshToken } = this.generateTokens(user.id, user.email);
  this.setAuthCookies(res, accessToken, refreshToken);

  return {
    message: 'Login con Google exitoso',
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  };
}
}
