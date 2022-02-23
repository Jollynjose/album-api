import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Artist } from '../artist/artist.entity';

@Entity('Songs')
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 25, nullable: false, name: 'url' })
  url: string;

  @Column({ type: 'timestamp', name: 'release_date' })
  releaseDate: Date;

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
}
