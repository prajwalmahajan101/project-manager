import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '../guards';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const IsAuth = () => {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBearerAuth(),
  );
};
