import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class DropSuppliersDebtsTable1606070733799
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('suppliers_debts');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'suppliers_debts',
        columns: [
          {
            name: 'suppliers_id',
            type: 'uuid',
          },
          {
            name: 'debts_id',
            type: 'uuid',
          },
        ],
      }),
    );
  }
}
