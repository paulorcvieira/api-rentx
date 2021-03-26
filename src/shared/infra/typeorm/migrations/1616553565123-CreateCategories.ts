import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { idColumn, timestampColumns } from '../utils'

export const CATEGORIES_TABLE_NAME = 'categories'

export class CreateCategories1616553565123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: CATEGORIES_TABLE_NAME,
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
    await queryRunner.dropTable(CATEGORIES_TABLE_NAME)
  }
}
