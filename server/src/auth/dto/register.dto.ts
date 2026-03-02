import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';
import { IsFullName } from '../../common/validators/is-full-name.validator';
import { IsStrongPassword } from '../../common/validators/is-strong-password.validator';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsFullName()
  @Trim()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
