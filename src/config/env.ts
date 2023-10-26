import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = (file: string) =>
  path.join(path.dirname(require.main.filename), '..', '..', file);

dotenv.config();

export const config = {
  api: {
    port: process.env.SERVER_PORT,
    jwt_secret: process.env.JWT_SECRET,
  },
  db: {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    tz: process.env.TZ ? process.env.TZ : 'UTC',
  },
  sentry: {
    dsn: process.env.SENTRY_DNS,
    environment: process.env.SENTRY_ENVIRONMENT,
  },
};

export function extractIntegerEnvVar(stringValue: string): number {
  const numberValue = parseInt(stringValue, 10);

  if (Number.isNaN(numberValue)) {
    const message = `The environment variable "${stringValue}" has to hold a stringified integer value - not ${stringValue}`;

    throw new Error(message);
  }

  return numberValue;
}

export function extractBooleanEnvVar(stringValue: string): boolean {
  return stringValue == 'true';
}
