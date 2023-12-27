import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsString({ message: 'Username must be string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(32, { message: 'Username is too long' })
  @ApiProperty({ type: String, example: 'prajwal-admin' })
  username: string;

  @IsEmail({}, { message: 'Invalid Email' })
  @ApiProperty({ type: String, example: 'prajwal.admin@google.com' })
  email: string;

  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password too short' })
  @ApiProperty({ type: String, example: 'abc@1234' })
  password: string;
}
