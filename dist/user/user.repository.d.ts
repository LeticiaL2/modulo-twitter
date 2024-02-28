import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        password: string;
        name: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
