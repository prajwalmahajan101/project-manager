import { Request } from 'express';

import { User } from 'src/entities';

export interface IAuthRequest extends Request {
  user?: User;
}
