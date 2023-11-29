import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddDeletedFieldToTweetTable1700836738522
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tweets',
      new TableColumn({
        name: 'excluido',
        type: 'boolean',
        default: false,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tweets', 'excluido')
  }
}
