import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @IsEmail()
  email: string;

  @IsString({ message: 'password must be string' })
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
