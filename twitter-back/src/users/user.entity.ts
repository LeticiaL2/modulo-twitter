import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';

  @Entity()
  @Unique(['email'])
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    email: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    usuario: string;
  
    @Column({ nullable: false, type: 'varchar', length: 20 })
    nome: string;
  
    @Column({ nullable: false })
    senha: string;

    @Column({ nullable: false })
    salt: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }