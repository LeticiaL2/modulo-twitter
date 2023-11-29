import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersTable1699229592456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usuarios',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar(100)',
            isUnique: true,
          },
          {
            name: 'usuario',
            type: 'varchar(50)',
            isUnique: true,
          },
          {
            name: 'nome',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'senha',
            type: 'varchar(100)',
          },
          {
            name: 'ativo',
            type: 'boolean',
            default: true,
          },
          {
            name: 'data_criacao',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'data_atualizacao',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'data_ativacao',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'expiracao_token',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usuarios')
  }
}
