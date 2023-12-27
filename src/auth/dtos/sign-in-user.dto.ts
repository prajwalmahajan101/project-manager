import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInUserDto {
  @IsEmail({}, { message: 'Invalid Email' })
  @ApiProperty({ type: String, example: 'prajwal.admin@google.com' })
  email: string;

  @IsString({ message: 'password must be string' })
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(8, { message: 'Password too short' })
  @ApiProperty({ type: String, example: 'abc@1234' })
  password: string;
}
