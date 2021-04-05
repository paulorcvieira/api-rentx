import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export default class AlterRentalsAddStartDate1617594496485
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'rentals',
      new TableColumn({
        name: 'start_date',
        type: 'timestamp',
        default: 'now()',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('rentals', 'start_date')
  }
}
