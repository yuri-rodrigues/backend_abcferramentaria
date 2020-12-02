import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateSupplierContactID1606007141756
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'suppliers',
      new TableColumn({
        name: 'contact',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'suppliers',
      new TableForeignKey({
        name: 'SuppliersContacts',
        columnNames: ['contact'],
        referencedColumnNames: ['id'],
        referencedTableName: 'suppliers_contacts',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('suppliers', 'SuppliersContacts');

    await queryRunner.addColumn(
      'suppliers',
      new TableColumn({
        name: 'contact',
        type: 'uuid',
      }),
    );
  }
}
