import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDtoResponse } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository
  ) {}

  async findAll(): Promise<UserDtoResponse[]> {
    const retrievedUsers = await this._userRepository.find({
      where: { status: true },
    });
    if (!retrievedUsers.length) throw new NotFoundException('not found');
    const userResponseDto = plainToClass(UserDtoResponse, retrievedUsers);
    return userResponseDto;
  }
  async findById(id: number): Promise<UserDtoResponse> {
    const retrievedUser = await this._userRepository.findOne(id, {
      where: { status: true },
    });
    if (!retrievedUser) throw new NotFoundException('not found');
    const userResponseDto = plainToClass(UserDtoResponse, retrievedUser);
    return userResponseDto;
  }

  async create(user: User): Promise<UserDtoResponse> {
    const createdUser = await this._userRepository.save(user);
    const userResponseDto = plainToClass(UserDtoResponse, createdUser);
    return userResponseDto;
  }
  async update(
    id: number,
    user: User
  ): Promise<UserDtoResponse> {
    const foundedUser = await this._userRepository.findOne(id);
    if (!foundedUser) throw new NotFoundException('not found');

    const updatedUser = await this._userRepository.update(id, user);
    const userResponseDto = plainToClass(UserDtoResponse, updatedUser);
    return userResponseDto;
  }
  async delete(id: number): Promise<any> {
    const findUser = await this._userRepository.findOne(id, {
      where: { status: true },
    });
    if (!findUser) throw new NotFoundException();
    await this._userRepository.update(id, {
      status: false,
    });
  }
}
