module.exports = {
  development: {
    username: "dev",
    password: "dev",
    database: "techrs",
    host: "localhost",
    port: 5432,
    dialect: "postgres"
  },
  staging: {
    username: process.env.DB_POSTGRES_USERNAME ?? 'techrs',
    password: process.env.DB_POSTGRES_PASSWORD,
    database: process.env.DB_POSTGRES_DATABASE ?? 'techrs',
    host: process.env.DB_POSTGRES_HOST ?? 'postgres',
    port: parseInt(process.env.DB_POSTGRES_PORT ?? '5432'),
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_POSTGRES_USERNAME ?? 'techrs',
    password: process.env.DB_POSTGRES_PASSWORD,
    database: process.env.DB_POSTGRES_DATABASE ?? 'techrs',
    host: process.env.DB_POSTGRES_HOST ?? 'postgres',
    port: parseInt(process.env.DB_POSTGRES_PORT ?? '5432'),
    dialect: "postgres"
  },
};
