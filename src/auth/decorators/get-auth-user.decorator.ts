import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

import { User } from '@/entities';

import { IAuthRequest } from '../interfaces';

export const GetAuthUser = createParamDecorator(
  (
    data: 'id' | 'email' | 'username' | 'role' | undefined,
    ctx: ExecutionContext,
  ): User | string | number | undefined => {
    const request: IAuthRequest = ctx.switchToHttp().getRequest();
    const user: User | undefined = request.user;
    if (!user) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }
    if (data) return user[data];
    return data;
  },
);
