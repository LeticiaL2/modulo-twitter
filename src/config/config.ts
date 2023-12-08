require('dotenv').config();

export const databaseConfig = {
    type: 'mysql' as const,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
};

export const jwtOptions = {
    secret: process.env.JWT_SECRET,
    signOptions: { 
        expiresIn: process.env.JWT_EXPIRES_IN 
    },
};