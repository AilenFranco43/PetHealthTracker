import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { GetUser } from './decorators/get-user.decorator';
import { Req } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    return this.authService.login(dto, res);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    return this.authService.register(dto, res);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response): { message: string } {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { message: 'Sesión cerrada correctamente' };
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetUser('userId') userId: string,
    @GetUser('email') email: string,
    @Res({ passthrough: true }) res: Response,
  ): { message: string } {
    return this.authService.refreshTokens(userId, email, res);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getMe(@GetUser('userId') userId: string) {
    return await this.authService.getCurrentUser(userId);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return await this.authService.resetPassword(dto);
  }



  // --- GOOGLE AUTH ---

@Get('google')
@UseGuards(GoogleAuthGuard)
async googleAuth() {
 
}

@Get('google/callback')
@UseGuards(GoogleAuthGuard)
async googleAuthRedirect(@Req() req, @Res() res: Response) {

  await this.authService.googleLogin(req.user, res);

  // Redirige al frontend
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
}

}

