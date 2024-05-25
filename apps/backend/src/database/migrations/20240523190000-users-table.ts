import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Up');

  await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS public.users (
      user_id uuid DEFAULT gen_random_uuid() NOT NULL,
      cpf char(11) NOT NULL,
      created_at timestamptz DEFAULT now() NOT NULL,
      updated_at timestamptz DEFAULT now() NOT NULL,
      CONSTRAINT users_pkey PRIMARY KEY (user_id)
    );
    CREATE UNIQUE INDEX users_user_id ON public.users (user_id);
    CREATE UNIQUE INDEX users_cpf ON public.users (cpf);
  `);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Down');

  await queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS public.users;
  `);
};
