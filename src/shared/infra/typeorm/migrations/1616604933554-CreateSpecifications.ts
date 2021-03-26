import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { idColumn, timestampColumns } from '../utils'

export const SPECIFICATIONS_TABLE_NAME = 'specifications'

export class CreateSpecifications1616604933554 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: SPECIFICATIONS_TABLE_NAME,
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          ...timestampColumns,
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(SPECIFICATIONS_TABLE_NAME)
  }
}
