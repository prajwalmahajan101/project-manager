import { verify } from 'argon2';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/entities';

import { RegisterUserDto, SignInUserDto } from './dtos';
import { IPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterUserDto): Promise<User> {
    return this.usersService.register(dto.email, dto.username, dto.password);
  }

  async signin(dto: SignInUserDto): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.findByEmail(dto.email);
      if (!user) {
        throw new UnauthorizedException({
          message: 'Email/Password Not Matched',
        });
      }
      const isMatched = await verify(user.password, dto.password);
      if (!isMatched) {
        throw new UnauthorizedException({
          message: 'Email/Password Not Matched',
        });
      }

      const access_token = await this.#generateToken(user);
      return { access_token };
    } catch (err) {
      throw new BadRequestException({ message: 'Some Error Occurred' });
    }
  }

  async #generateToken(user: User): Promise<string> {
    const payload: IPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const secret = this.config.get<string>('JWT_SECRET');

    return await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
  }
}
