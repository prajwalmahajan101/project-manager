import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app.module';
import * as pactum from 'pactum';
import { RegisterUserDto, SignInUserDto } from '@/auth/dtos';

describe('App e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Authentication', () => {
    const registerDto: RegisterUserDto = {
      username: 'test-user',
      email: 'test@gmail.com',
      password: 'abc@1234',
    };
    const signinDto: SignInUserDto = {
      email: 'test@gmail.com',
      password: 'abc@1234',
    };

    describe('Register', () => {
      // Without Body
      it('Should throw without Body', () => {
        return pactum.spec().post('/auth/register').expectStatus(400);
      });

      // With Invalid Body
      // no Password
      it('Should throw without password', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: registerDto.email,
            username: registerDto.username,
          })
          .expectStatus(400);
      });

      // invalid Password
      it('Should throw with invalid password', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: registerDto.email,
            username: registerDto.username,
            password: 123,
          })
          .expectStatus(400);
      });

      // invalid Password
      it('Should throw with short password', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: registerDto.email,
            username: registerDto.username,
            password: '123',
          })
          .expectStatus(400);
      });

      // without email
      it('Should throw without email', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            password: registerDto.password,
            username: registerDto.username,
          })
          .expectStatus(400);
      });

      //not string email
      it('Should throw with invalid email', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: '123',
            username: registerDto.username,
            password: registerDto.password,
          })
          .expectStatus(400);
      });

      // invalid email
      it('Should throw with not string email', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: 123,
            username: registerDto.username,
            password: registerDto.password,
          })
          .expectStatus(400);
      });

      // Without username
      it('Should throw without username', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            password: registerDto.password,
            email: registerDto.email,
          })
          .expectStatus(400);
      });

      // with not string username
      it('Should throw with invalid username', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            password: registerDto.password,
            email: registerDto.email,
            username: 123,
          })
          .expectStatus(400);
      });

      it('Should throw with long username', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            password: registerDto.password,
            email: registerDto.email,
            username: '12345678890123456788901234567889012345678890',
          })
          .expectStatus(400);
      });

      // Correct Body
      it('Should Register User with Valid Body', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({ ...registerDto })
          .expectStatus(201);
      });

      // Conflicting Email
      it('Should throw if already Registered email is used', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({ ...registerDto })
          .expectStatus(400);
      });
    });

    describe('Sign In', () => {
      const { email, password } = signinDto;
      // Without body
      it('Should throw without Body', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });

      //Without email
      it('Should throw without email', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password })
          .expectStatus(400);
      });

      // With not String email
      it('Should throw with not string email', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password, email: 123 })
          .expectStatus(400);
      });

      // with invalid email
      it('Should throw with invalid email', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password, email: '123' })
          .expectStatus(400);
      });

      // not registered email
      it('Should throw with not registered email', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password, email: '123@gmail.com' })
          .expectStatus(400);
      });
      //without password
      it('Should throw without password', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email })
          .expectStatus(400);
      });
      //with not string password
      it('Should throw with not string password', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: 123, email })
          .expectStatus(400);
      });

      //with short password
      it('Should throw with short password', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: '123', email })
          .expectStatus(400);
      });

      // With Wrong Password
      it('Should throw with wrong password', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: `password123`, email })
          .expectStatus(400);
      });

      // Should Login
      it('Should Login User', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(signinDto)
          .expectStatus(200)
          .stores('token', 'access_token');
      });
    });
  });
});
