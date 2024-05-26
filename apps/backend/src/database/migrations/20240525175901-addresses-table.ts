import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Up');

  await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS public.addresses (
      address_id uuid DEFAULT gen_random_uuid() NOT NULL,
      user_id uuid NOT NULL,
      name varchar(255) NOT NULL,
      street varchar(255),
      neighbourhood varchar(255),
      city varchar(255),
      street_number varchar(255),
      zip_code varchar(255),
      alerts_enabled boolean NOT NULL DEFAULT false,
      donations_enabled boolean NOT NULL DEFAULT false,
      volunteers_enabled boolean NOT NULL DEFAULT false,
      created_at timestamptz DEFAULT now() NOT NULL,
      updated_at timestamptz DEFAULT now() NOT NULL,
      CONSTRAINT addresses_pkey PRIMARY KEY (address_id)
    );

    ALTER TABLE public.addresses ADD CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE ON UPDATE CASCADE;
  `);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Down');

  await queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS public.addresses;
  `);
};
