import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterUserDto, SignInUserDto } from './dtos';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
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
    console.log(dto);
    return this.authService.signin(dto);
  }
}
