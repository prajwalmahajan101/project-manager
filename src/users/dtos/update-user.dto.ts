import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Username must be string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(32, { message: 'Username is too long' })
  @ApiPropertyOptional({
    type: String,
    example: 'prajwal-admin-1',
    maxLength: 32,
  })
  @IsOptional()
  username?: string;

  @IsEmail({}, { message: 'Invalid Email' })
  @ApiPropertyOptional({ type: String, example: 'prajwal.admin123@gmail.com' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password too short' })
  @ApiPropertyOptional({ type: String, example: 'abc@1234', minLength: 8 })
  @IsOptional()
  password?: string;

  @IsString({ message: 'Designation must be string' })
  @MinLength(3, { message: 'Designation too short' })
  @MaxLength(20, { message: 'Designation is too long' })
  @ApiPropertyOptional({
    type: String,
    example: 'SDE-2 (Backend)',
    maxLength: 20,
    minLength: 3,
  })
  @IsOptional()
  designation?: string;
}
