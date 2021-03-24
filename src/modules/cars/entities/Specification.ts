import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('specifications')
class Specification {
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

export { Specification }
