import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTweetsTable1699966727883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tweets',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'texto',
            type: 'varchar(280)',
          },
          {
            name: 'data_criacao',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'usuarioId',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['usuarioId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'usuarios',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tweets')
  }
}
