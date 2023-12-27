import { Request } from 'express';
import { User } from 'src/users/users.entity';

export interface IAuthRequest extends Request {
  user?: User;
}
