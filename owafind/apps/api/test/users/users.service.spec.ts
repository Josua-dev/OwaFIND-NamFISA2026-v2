import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/users/users.service';
import { User } from '../../src/users/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UserRepository',
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user with hashed password', async () => {
      // TODO: Implement proper test
      const createUserDto = {
        email: 'test@test.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };

      // Mock the repository methods
      repository.findOne.mockResolvedValue(undefined); // No existing user
      repository.create.mockImplementation((dto) => dto);
      repository.save.mockResolvedValue({
        id: '1',
        ...createUserDto,
        password: 'hashed_password', // Would be hashed in real implementation
      });

      const result = await service.create(createUserDto);
      expect(result).toBeDefined();
      expect(result.email).toBe(createUserDto.email);
    });
  });
});