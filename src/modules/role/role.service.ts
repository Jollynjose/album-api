import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { RoleRepository } from './Role.repository';
import { Role } from './role.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository
  ) {}

  async findAll(): Promise<Role[]> {
    const retrievedRoles = await this._roleRepository.find({
      where: { status: 'ACTIVE' },
    });
    if (!retrievedRoles.length) throw new NotFoundException('not found');
    return retrievedRoles;
  }
  async findById(id: number): Promise<Role> {
    const retrievedRole = await this._roleRepository.findOne(id, {
      where: { status: true },
    });
    if (!retrievedRole) throw new NotFoundException('not found');
    return retrievedRole;
  }

  async create(user: { name: string; description: string }): Promise<Role> {
    const createdRole = await this._roleRepository.save(user);
    return createdRole;
  }
  async update(id: number, role: Role): Promise<UpdateResult> {
    const foundedRole = await this._roleRepository.findOne(id);
    if (!foundedRole) throw new NotFoundException('not found');
    const updatedRole = await this._roleRepository.update(id, role);
    return updatedRole;
  }
  async delete(id: number): Promise<any> {
    const findUser = await this._roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });
    if (!findUser) throw new NotFoundException();
    await this._roleRepository.update(id, {
      status: 'INACTIVE',
    });
  }
}
