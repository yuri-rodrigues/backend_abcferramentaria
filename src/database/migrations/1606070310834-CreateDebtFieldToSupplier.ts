import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateDebtFieldToSupplier1606070310834
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'suppliers',
      new TableColumn({
        name: 'debt_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'suppliers',
      new TableForeignKey({
        columnNames: ['debt_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'debts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('suppliers', 'debt_id');

    await queryRunner.dropColumn('suppliers', 'debt_id');
  }
}
