import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Role } from '../role/role.entity';
import { UserDetails } from './user.detail.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToOne((type) => UserDetails, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'detail_id' })
  details: UserDetails;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_At',
  })
  updatedAt: Date;

  // @ManyToMany(()=> Role, (Role)=> Role.users)
  // roles: Role[]
}
