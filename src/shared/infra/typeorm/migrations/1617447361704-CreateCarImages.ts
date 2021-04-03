import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { idColumn, timestampColumns } from '../utils/index'

export class CreateCarImages1617447361704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars_images',
        columns: [
          idColumn,
          { name: 'car_id', type: 'uuid' },
          { name: 'image_name', type: 'varchar' },
          ...timestampColumns,
        ],
        foreignKeys: [
          {
            name: 'fk_car_image',
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars_images')
  }
}
