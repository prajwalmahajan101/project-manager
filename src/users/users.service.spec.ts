import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project, Task, Team, User } from '@/entities';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test',
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            type: 'postgres',
            host: config.get<string>('DB_HOST'),
            port: config.get<number>('DB_PORT'),
            username: config.get<string>('DB_USERNAME'),
            password: config.get<string>('DB_PASSWORD'),
            database: config.get<string>('DB'),
            entities: [User, Task, Project, Team],
            synchronize: true,
          }),
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#register', () => {
    beforeEach(() => {
      jest.spyOn(service, 'register');
    });
    it('findByEmail should be defined', () => {
      expect(service.register).toBeDefined();
    });
    it('should be called', async () => {
      await service.register('test', 'email@gmail.com', 'abc@1234');
      expect(service.register).toHaveBeenCalledTimes(1);
      const data = await service.findAll();
      console.log(data);
    });
  });

  it('findByEmail should be defined', () => {
    expect(service.findByEmail).toBeDefined();
  });
  it('findByEmail should be defined', () => {
    expect(service.findAll).toBeDefined();
  });
  it('findByEmail should be defined', () => {
    expect(service.findById).toBeDefined();
  });
  it('findByEmail should be defined', () => {
    expect(service.findByIdOrThrow).toBeDefined();
  });

  it('findByEmail should be defined', () => {
    expect(service.update).toBeDefined();
  });
  it('findByEmail should be defined', () => {
    expect(service.delete).toBeDefined();
  });
});
