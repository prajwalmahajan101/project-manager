import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @IsString({ message: 'Username must be string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(32, { message: 'Username is too long' })
  username: string;

  @IsEmail()
  email: string;

  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
