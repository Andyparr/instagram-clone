import * as bcrypt from 'bcryptjs'
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'
import { Post } from './Post'
@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 255 })
  firstName: string

  @Column('varchar', { length: 255 })
  lastName: string

  @Column('varchar', { length: 255 })
  email: string

  @Column('text')
  password: string

  @Column('varchar', { length: 255 })
  username: string

  @Column('timestamptz')
  registeredAt: Date

  @Column('boolean', { default: false })
  confirmed: boolean

  @Column('boolean', { default: false })
  forgotPasswordLocked: boolean

  @OneToMany(() => Post, post => post.user)
  posts: Post[]

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
