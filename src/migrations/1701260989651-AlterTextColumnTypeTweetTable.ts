import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterTextColumnTypeTweetTable1701260989651
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE tweets MODIFY texto TEXT`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE tweets MODIFY texto VARCHAR(255)`)
  }
}
