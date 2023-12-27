import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '../guards';

export const IsAuth = () => {
  return applyDecorators(UseGuards(AuthGuard));
};
