import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';

import { UserRole } from '@/entities';

import { IAuthRequest } from '../interfaces';

export const MinRole = (role: UserRole) => {
  const RolePrivilege = {
    [UserRole.TeamMember]: 1,
    [UserRole.TeamManager]: 2,
    [UserRole.ProjectManager]: 3,
    [UserRole.SuperAdmin]: 4,
  };
  class MinRoleGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const req: IAuthRequest = context.switchToHttp().getRequest();
      const userPrivilege: number =
        RolePrivilege[req.user?.role ?? UserRole.TeamMember];

      const minPrivilege = RolePrivilege[role];
      if (userPrivilege < minPrivilege)
        throw new UnauthorizedException({
          message: `Only User With Privilege Role ${role} or more are allowed to access this resource`,
        });
      return true;
    }
  }

  return mixin(MinRoleGuard);
};
