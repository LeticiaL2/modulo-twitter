import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRetweetsTable1700571998587 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'retweets',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'tweetPaiId',
            type: 'varchar',
          },
          {
            name: 'tweetId',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['tweetPaiId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tweets',
          },
          {
            columnNames: ['tweetId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tweets',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('retweets')
  }
}
