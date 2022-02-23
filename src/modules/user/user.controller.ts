import {
  Param,
  Controller,
  Get,
  Post,
  ParseIntPipe,
  Body,
  Delete,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { UserDtoResponse } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  @Get()
  async findAll(): Promise<UserDtoResponse[]> {
    const foundUsers = await this._userService.findAll();
    return foundUsers;
  }
  @Get('/:id')
  findById(
    @Param('id', new ParseIntPipe()) id: number
  ): Promise<UserDtoResponse> {
    return this._userService.findById(id);
  }
  @Patch('/:id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: User
  ): Promise<UserDtoResponse> {
    return this._userService.update(id, body);
  }
  @Post()
  create(@Body() body: User): Promise<UserDtoResponse> {
    return this._userService.create(body);
  }
  @Delete('/:id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return this._userService.delete(id);
  }
}
