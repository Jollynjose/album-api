import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('Bands')
export class Artist extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 25, nullable: false, name: 'fullname' })
  fullName: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'date' })
  born: Date;

  @Column({ type: 'varchar', nullable: false })
  gender: string;
}
