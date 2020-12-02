import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAgenciesTable1605399226180
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'agencies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'num_agencia',
            type: 'varchar',
          },
          {
            name: 'gerente',
            type: 'varchar',
          },
          {
            name: 'telefone1',
            type: 'varchar',
          },
          {
            name: 'telefone2',
            type: 'varchar',
          },
          {
            name: 'email',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('agencies');
  }
}
