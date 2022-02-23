import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { Role } from './role.entity';
import { RoleType } from './role.enum';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

describe('RoleController', () => {
  let controller: RoleController;

  const mockRoleService = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        RoleService,
        { provide: getRepositoryToken(Role), useValue: RoleRepository },
      ],
    })
      .overrideProvider(RoleService)
      .useValue(mockRoleService)
      .compile();

    controller = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a role', () => {
    expect(
      controller.create({ name: 'TEST', description: 'asas' } as Role)
    ).toEqual({
      id: expect.any(Number),
      name: 'TEST',
      description: 'asas',
      status: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should get a roles', () => {
    expect(controller.findAll());
  });
});
