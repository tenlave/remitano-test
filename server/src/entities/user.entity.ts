import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VideoEntity } from './video.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 500 })
  email: string;

  @Column({ type: 'nvarchar', length: 50 })
  password: string;

  @OneToMany(() => VideoEntity, (t: VideoEntity) => t.user)
  videos: VideoEntity[];
}
