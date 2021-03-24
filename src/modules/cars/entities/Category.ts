import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('categories')
class Category {
  @PrimaryColumn()
  @Column()
  id?: string

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  updated_at: Date
}

export { Category }
