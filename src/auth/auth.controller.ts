import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterUserDto, SignInUserDto } from './dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SignInUserDto) {
    console.log(dto);
    return this.authService.signin(dto);
  }
}
