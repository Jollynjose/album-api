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
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly _RoleService: RoleService) {}
  @Get()
  async findAll(): Promise<Role[]> {
    const foundRoles = await this._RoleService.findAll();
    console.log(1);
    return foundRoles;
  }
  @Get('/:id')
  findById(@Param('id', new ParseIntPipe()) id: number): Promise<Role> {
    return this._RoleService.findById(id);
  }
  @Patch('/:id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: Role
  ): Promise<UpdateResult> {
    return this._RoleService.update(id, body);
  }
  @Post()
  create(@Body() body: Role): Promise<Role> {
    return this._RoleService.create(body);
  }
  @Delete('/:id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return this._RoleService.delete(id);
  }
}
