import { PrismaService } from 'src/prisma/prisma.service';
export declare class BaseRepository<T> {
    private readonly prisma;
    private readonly modelName;
    constructor(prisma: PrismaService, modelName: string);
    create(payload: Partial<T>): Promise<T>;
    findByEmail(email: string): Promise<T>;
}
