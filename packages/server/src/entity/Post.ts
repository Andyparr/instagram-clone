import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne
} from 'typeorm'
import { User } from './User'

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  imageUrl: string

  @Column('timestamptz')
  uploadedAt: Date

  @Column('uuid')
  userId: string

  @ManyToOne(() => User, user => user.posts)
  user: User
}
