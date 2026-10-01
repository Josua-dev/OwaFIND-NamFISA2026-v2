import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // TODO: Implement user creation with password hashing
    return undefined;
  }

  async findAll(): Promise<User[]> {
    // TODO: Implement find all users
    return [];
  }

  async findOne(id: string): Promise<User> {
    // TODO: Implement find one user
    return undefined;
  }

  async findByEmail(email: string): Promise<User> {
    // TODO: Implement find by email
    return undefined;
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    // TODO: Implement user update
    return undefined;
  }

  async remove(id: string): Promise<void> {
    // TODO: Implement user deletion
    return undefined;
  }
}