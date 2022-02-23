import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Artist } from '../artist/artist.entity';

@Entity('Albums')
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 25, nullable: false, name: 'url' })
  url: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @ManyToOne(() => Artist, { eager: true, cascade: true })
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;
}
