import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterUserDeleteAddress1616800384255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'address')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'address',
        type: 'varchar',
      }),
    )
  }
}
