import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('cars_images')
class CarImage {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column('uuid')
  car_id: string

  @Column()
  image_name: string

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

export { CarImage }
