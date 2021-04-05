import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('rentals')
class Rental {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  car_id: string

  @Column()
  user_id: string

  @CreateDateColumn()
  start_date: Date

  @CreateDateColumn()
  end_date: Date

  @CreateDateColumn()
  expected_return_date: Date

  @Column('numeric')
  total: number

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Rental }
