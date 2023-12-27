import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@/users/users.service';

import { IAuthRequest, IPayload } from '../interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
    private userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: IAuthRequest = context.switchToHttp().getRequest();
    const token = this.extractTokenFormHeader(req);
    if (!token) {
      throw new UnauthorizedException({ message: 'Token Not Provided' });
    }
    try {
      const payload: IPayload = await this.extractPayLoadFormToken(token);
      const user = await this.userService.findByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException({
          message: 'User Deleted/Deactivated',
        });
      }
      req.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException({ message: 'Invalid Token' });
    }
  }

  extractTokenFormHeader(req: IAuthRequest): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  extractPayLoadFormToken(token: string): Promise<IPayload> {
    const secret = this.config.get<string>('JWT_SECRET');
    return this.jwt.verifyAsync<IPayload>(token, { secret });
  }
}
