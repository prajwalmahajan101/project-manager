import { hash } from 'argon2';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './users.entity';
import { UpdateUserDto } from './dtos';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOneBy({
      email,
      isActive: true,
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

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({
      id,
      isActive: true,
    });
  }

  async findByIdOrThrow(id: number): Promise<User> {
    const user = await this.findById(id);
    if (!user)
      throw new NotFoundException({ message: `User By id ${id} not found` });
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepo.findBy({ isActive: true });
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findByIdOrThrow(id);
    if (dto.designation) user.designation = dto.designation;
    if (dto.email) {
      const existing_user = await this.findByEmail(dto.email);
      if (existing_user)
        throw new BadRequestException({ message: 'Email Already Taken' });
      user.email = dto.email;
    }
    if (dto.username) user.username = dto.username;
    if (dto.password) {
      const hashedPassword = await hash(dto.password);
      user.password = hashedPassword;
    }
    await this.userRepo.save(user);
    return user;
  }

  async delete(id: number) {
    const user = await this.findByIdOrThrow(id);
    user.isActive = false;
    await this.userRepo.save(user);
    return { message: `user with id ${id} deleted Successfully` };
  }
}
