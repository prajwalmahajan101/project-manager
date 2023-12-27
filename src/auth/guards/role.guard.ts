import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';

import { UserRole } from '@/entities';

import { IAuthRequest } from '../interfaces';

export const RoleGuard = (role: UserRole) => {
  class RoleGuardClass implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const req: IAuthRequest = context.switchToHttp().getRequest();
      console.log(req.user, role);
      if (req.user?.role !== role) {
        throw new UnauthorizedException({
          message: `Only User With Role ${role} are allowed to access this resource`,
        });
      }
      return true;
    }
  }
  return mixin(RoleGuardClass);
};
