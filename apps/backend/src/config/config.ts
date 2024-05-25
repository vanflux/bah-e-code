export const env = process.env.NODE_ENV ?? 'development';
export const isDevelopment = env === 'development';
export const isStaging = env === 'staging';
export const isProduction = env === 'production';

const invalidEnv = !isDevelopment && !isStaging && !isProduction;
if (invalidEnv) throw new Error(`Provide a valid NODE_ENV! ${env} is not valid!`);

export function loadConfig() {
  return {
    port: process.env.PORT_BACKEND_DIST_MAIN ?? process.env.PORT_APP ?? 4000,
    db: {
      postgres: {
        host: process.env.DB_POSTGRES_HOST ?? 'localhost',
        port: parseInt(process.env.DB_POSTGRES_PORT ?? '5432'),
        username: process.env.DB_POSTGRES_USERNAME ?? 'dev',
        password: process.env.DB_POSTGRES_PASSWORD ?? 'dev',
        database: process.env.DB_POSTGRES_DATABASE ?? 'techrs',
      },
    },
    auth: {
      jwtSecret: process.env.AUTH_JWT_SECRET ?? 'jwtSecret',
    },
  } as const;
}
