import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { idColumn, timestampColumns } from '../utils'

export class CreateRoles1616706066571 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
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
    await queryRunner.dropTable('roles')
  }
}
