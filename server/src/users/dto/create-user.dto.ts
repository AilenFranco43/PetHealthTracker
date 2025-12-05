import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  photo_url?: string;

  @IsOptional()
  @IsString()
  provider?: string;
}
