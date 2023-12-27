import { UserRole } from 'src/entities';
import { RoleGuard } from '../guards/role.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '../guards';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const IsRole = (role: UserRole) => {
  return applyDecorators(
    UseGuards(
      AuthGuard,
      RoleGuard(role),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
      ApiBearerAuth(),
    ),
  );
};

export const IsSuperAdmin = () => IsRole(UserRole.SuperAdmin);
export const IsProjectManager = () => IsRole(UserRole.ProjectManager);
export const IsTeamManager = () => IsRole(UserRole.TeamManager);
