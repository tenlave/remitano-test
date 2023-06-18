import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('video')
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 1000 })
  url: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  upVote: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  downVote: number;

  @Column({ type: 'nvarchar', default: null })
  description: string;

  @Column({ type: 'int' })
  userId: number;


  @ManyToOne(() => UserEntity, (user: UserEntity) => user.videos)
  user: UserEntity;
}
