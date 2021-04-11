import { Exclude, Expose } from 'class-transformer'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import uploadConfig from '../../../../../config/upload-config'
import { Role } from './Role'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  @Exclude()
  password: string

  @Column()
  email: string

  @Column()
  driver_license: string

  @Column('boolean')
  status: boolean

  @CreateDateColumn()
  created_at: Date

  @Column()
  avatar: string

  @CreateDateColumn()
  updated_at: Date

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles: Role[]

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/files/${this.avatar}`
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`
      default:
        return null
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
      this.status = true
    }
  }
}

export { User }
