import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateBankAccountRelation1606009301815
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'bank_accounts',
      new TableColumn({
        name: 'agencie_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'bank_accounts',
      new TableForeignKey({
        name: 'BankAccounts',
        columnNames: ['agencie_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'agencies',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('bank_accounts', 'BankAccounts');

    await queryRunner.addColumn(
      'bank_accounts',
      new TableColumn({
        name: 'agencie_id',
        type: 'uuid',
      }),
    );
  }
}
