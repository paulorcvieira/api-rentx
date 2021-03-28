import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { idColumn, timestampColumns } from '../utils'

export const USERS_TABLE_NAME = 'users'

export class CreateUsers1616695490190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: USERS_TABLE_NAME,
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'driver_license',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'boolean',
            default: true,
          },
          ...timestampColumns,
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(USERS_TABLE_NAME)
  }
}
