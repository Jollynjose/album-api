import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Song } from '../song/song.entity';

@Entity('artists')
export class Artist extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 25, nullable: false, name: 'fullname' })
  fullName: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(() => Song, (song) => song.artist, { nullable: true })
  @JoinColumn({ name: 'songs' })
  songs: Song[];
}
