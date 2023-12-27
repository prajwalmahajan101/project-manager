import { IsAuth } from '@/auth/decorators';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UpdateUserDto } from './dtos';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('users')
@IsAuth()
@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  @ApiOkResponse({ description: 'Fetched Active Users' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Fetched Active User' })
  @ApiBadRequestResponse({ description: 'Provided Invalid Id' })
  @ApiNotFoundResponse({ description: 'User with Provided Id not Found' })
  findById(@Param('id') id: number): Promise<User> {
    if (isNaN(id)) throw new BadRequestException({ message: 'Invalid Id' });
    return this.usersService.findByIdOrThrow(id);
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'User Updated' })
  @ApiBadRequestResponse({ description: 'Provided Invalid Id' })
  @ApiNotFoundResponse({ description: 'User with Provided Id not Found' })
  update(@Param('id') id: number, @Body() dto: UpdateUserDto): Promise<User> {
    if (isNaN(id)) throw new BadRequestException({ message: 'Invalid Id' });
    return this.usersService.update(id, dto);
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'User Deactivated' })
  @ApiBadRequestResponse({ description: 'Provided Invalid Id' })
  @ApiNotFoundResponse({ description: 'User with Provided Id not Found' })
  delete(@Param('id') id: number) {
    if (isNaN(id)) throw new BadRequestException({ message: 'Invalid Id' });
    return this.usersService.delete(id);
  }
}
