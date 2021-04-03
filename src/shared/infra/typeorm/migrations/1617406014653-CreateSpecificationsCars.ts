import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateSpecificationsCars1617406014653
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'specification_id',
            type: 'uuid',
          },
          {
            name: 'car_id',
            type: 'uuid',
          },
        ],
      }),
    )

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'fk_specification_car',
        referencedTableName: 'specifications',
        referencedColumnNames: ['id'],
        columnNames: ['specification_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    )

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'fk_car_specification',
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        columnNames: ['car_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specifications_cars',
      'fk_car_specification',
    )

    await queryRunner.dropForeignKey(
      'specifications_cars',
      'fk_specification_car',
    )

    await queryRunner.dropTable('specifications_cars')
  }
}
