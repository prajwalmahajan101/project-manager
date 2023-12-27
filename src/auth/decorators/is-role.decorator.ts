import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { UserRole } from 'src/entities';

import { RoleGuard, AuthGuard } from '../guards';

export const IsRole = (role: UserRole) => () => {
  return applyDecorators(
    UseGuards(AuthGuard, RoleGuard(role)),
    ApiUnauthorizedResponse({ description: 'Under Privileged' }),
    ApiBearerAuth(),
  );
};

export const IsSuperAdmin = IsRole(UserRole.SuperAdmin);
export const IsProjectManager = IsRole(UserRole.ProjectManager);
export const IsTeamManager = IsRole(UserRole.TeamManager);
