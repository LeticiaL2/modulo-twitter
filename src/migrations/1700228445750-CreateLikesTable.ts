import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateLikesTable1700228445750 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'likes',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'tweetId',
            type: 'varchar',
          },
          {
            name: 'usuarioId',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['tweetId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tweets',
          },
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
    await queryRunner.dropTable('likes')
  }
}
