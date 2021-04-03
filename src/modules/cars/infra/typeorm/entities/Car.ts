import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Category } from './Category'
import { Specification } from './Specification'

@Entity('cars')
class Car {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  name: string

  @Column()
  description: string

  @Column('numeric')
  daily_rate: number

  @Column('boolean')
  available: boolean

  @Column()
  license_plate: string

  @Column('numeric')
  fine_amount: number

  @Column()
  brand: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column('uuid')
  category_id: string

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[]

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
      this.available = true
    }
  }
}

export { Car }
