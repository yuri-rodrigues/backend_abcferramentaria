import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreatAgencieBankID1606010745463
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'agencies',
      new TableColumn({
        name: 'bank_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'agencies',
      new TableForeignKey({
        name: 'Bank',
        columnNames: ['bank_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'banks',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('agencies', 'Bank');

    await queryRunner.addColumn(
      'agencies',
      new TableColumn({
        name: 'bank_id',
        type: 'uuid',
      }),
    );
  }
}
