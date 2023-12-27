import { Request } from 'express';

import { User } from '@/entities';

export interface IAuthRequest extends Request {
  user?: User;
}
