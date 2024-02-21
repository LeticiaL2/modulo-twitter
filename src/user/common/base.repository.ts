import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BaseRepository<T> {
  constructor(private readonly prisma: PrismaService, private readonly modelName: string) {}

  async create(payload: Partial<T>): Promise<T> {
    const createdItem = await this.prisma[this.modelName].create({ data: payload });
    return createdItem;
  }

  async findByEmail(email: string): Promise<T> {
    const foundItem = await this.prisma[this.modelName].findUnique({ where: { email } });
    return foundItem;
  }
}
