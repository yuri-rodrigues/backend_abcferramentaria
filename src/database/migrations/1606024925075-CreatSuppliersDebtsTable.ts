import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatSuppliersDebtsTable1606024925075
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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

    await queryRunner.createForeignKey(
      'suppliers_debts',
      new TableForeignKey({
        columnNames: ['suppliers_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'suppliers',
        name: 'fk_suppliers_debts_',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'suppliers_debts',
      new TableForeignKey({
        columnNames: ['debts_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'debts',
        name: 'fk_debts_suppliers_',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('suppliers_debts', 'fk_debts_suppliers_');

    await queryRunner.dropForeignKey('suppliers_debts', 'fk_suppliers_debts_');

    await queryRunner.dropTable('suppliers_debts');
  }
}
