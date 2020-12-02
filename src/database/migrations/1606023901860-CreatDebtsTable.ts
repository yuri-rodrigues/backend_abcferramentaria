import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatDebtsTable1606023901860
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'debts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'account_group_id',
            type: 'uuid',
          },
          {
            name: 'bank_account_id',
            type: 'uuid',
          },
          {
            name: 'supplier_id',
            type: 'uuid',
          },
          {
            name: 'value',
            type: 'decimal(10,2)',
          },
          {
            name: 'juros',
            type: 'decimal(10,2)',
          },
          {
            name: 'parcela',
            type: 'int',
          },
          {
            name: 'data_emissao',
            type: 'date',
          },
          {
            name: 'data_vencimento',
            type: 'date',
          },
          {
            name: 'data_quitacao',
            type: 'date',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'obs',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'debts',
      new TableForeignKey({
        columnNames: ['bank_account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bank_accounts',
        name: 'fk_bank_accounts_',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'debts',
      new TableForeignKey({
        columnNames: ['account_group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'account_groups',
        name: 'fk_account_groups_',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('debts', 'fk_account_groups_');

    await queryRunner.dropForeignKey('debts', 'fk_bank_accounts_');

    await queryRunner.dropTable('debts');
  }
}
