import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { UserRole } from 'src/entities';

import { AuthGuard, MinRole } from '../guards';

export const minRole = (role: UserRole) => () => {
  return applyDecorators(
    UseGuards(AuthGuard, MinRole(role)),
    ApiUnauthorizedResponse({ description: 'Under Privileged' }),
    ApiBearerAuth(),
  );
};

export const MinTeamManager = minRole(UserRole.TeamManager);
export const MinProjectManager = minRole(UserRole.ProjectManager);
