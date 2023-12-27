import { hash } from 'argon2';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOneBy({
      email,
    });
  }

  async register(
    email: string,
    username: string,
    password: string,
  ): Promise<User> {
    try {
      const hashedPassword = await hash(password);
      const user = this.userRepo.create({
        email,
        username,
        password: hashedPassword,
      });
      await this.userRepo.save(user);
      return user;
    } catch (err) {
      if (err.code == 23505) {
        throw new BadRequestException({ message: 'Email Already Registered' });
      }
      throw new BadRequestException({ message: 'Cannot Register User' });
    }
  }
}
