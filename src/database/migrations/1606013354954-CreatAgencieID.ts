import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreatAgencieID1606013354954 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'banks',
      new TableColumn({
        name: 'agencie_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'banks',
      new TableForeignKey({
        name: 'Agencie',
        columnNames: ['agencie_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'agencies',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('agencies', 'Bank');

    await queryRunner.dropColumn(
      'agencies',
      new TableColumn({
        name: 'bank_id',
        type: 'uuid',
      }),
    );
  }
}
