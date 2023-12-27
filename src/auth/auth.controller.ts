import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { RegisterUserDto, SignInUserDto } from './dtos';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @ApiCreatedResponse({ description: 'User Registered' })
  @ApiBadRequestResponse({ description: 'Invalid Input' })
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User Logged In' })
  @ApiBadRequestResponse({ description: 'Invalid Input' })
  signin(@Body() dto: SignInUserDto) {
    return this.authService.signin(dto);
  }
}
