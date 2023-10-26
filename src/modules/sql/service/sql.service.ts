import { Injectable } from '@nestjs/common';
import { config } from 'src/config/env';
import * as sql from 'mssql';

@Injectable()
export class SqlService {
  private pool: sql.ConnectionPool;
  dbConfig = {
    server: config.db.server,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password,
    port: config.db.port,
    options: {
      encrypt: false, // Se o seu banco de dados usa SSL, defina como true
      useUTC: config.db.tz == 'UTC',
    },
  };
  constructor() {
    this.pool = new sql.ConnectionPool(this.dbConfig);
  }

  async connectToDatabase() {
    try {
      const pool = await this.pool.connect();
      console.log('Conexão estabelecida com sucesso!');
      return pool;
    } catch (error) {
      console.log('Erro ao conectar ao banco de dados:', error);
      return null;
    }
  }

  async execute(query: string, params: any = {}): Promise<any> {
    const hasConnected = await this.pool.connect();
    if (!hasConnected) {
      return null;
    }
    try {
      const request = this.pool.request();
      Object.keys(params).forEach((key) => {
        request.input(key, params[key]);
      });
      const result = await request.query(query);
      console.log('Consulta feita com sucesso');
      return result.recordset;
    } catch (error) {
      console.log('Erro ao executar a consulta:', error);
      return false;
    } finally {
      // this.pool.close();
    }
  }

  async executeInsert(query: string, params: any = {}): Promise<any> {
    const hasConnected = await this.pool.connect();
    if (!hasConnected) {
      return null;
    }
    try {
      const request = this.pool.request();
      Object.keys(params).forEach((key) => {
        request.input(key, params[key]);
      });
      const result = await request.query(query);
      console.log('Consulta feita com sucesso');
      return { sucesso: true, data: result };
    } catch (error) {
      console.log('Erro ao executar a consulta:', error);
      return { sucesso: false, error };
    } finally {
      // this.pool.close();
    }
  }

  async executeCount(query: string, params: any = {}): Promise<any> {
    const hasConnected = await this.pool.connect();
    if (!hasConnected) {
      return null;
    }
    try {
      const request = this.pool.request();
      Object.keys(params).forEach((key) => {
        request.input(key, params[key]);
      });
      const result = await request.query(query);
      return result.recordset[0].count;
    } catch (error) {
      console.log('Erro ao executar a consulta:', error);
      return 0;
    } finally {
      // this.pool.close();
    }
  }

  async close() {
    await this.pool.close();
  }
}
