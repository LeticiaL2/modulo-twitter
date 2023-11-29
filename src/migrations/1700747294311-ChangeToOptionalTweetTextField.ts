import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class ChangeToOptionalTweetTextField1700747294311
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'tweets',
      'texto',
      new TableColumn({
        name: 'texto',
        type: 'varchar',
        isNullable: true,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'tweets',
      'texto',
      new TableColumn({
        name: 'texto',
        type: 'varchar',
        isNullable: false,
      }),
    )
  }
}
