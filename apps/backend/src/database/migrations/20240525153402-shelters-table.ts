import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Up');

  await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS public.shelters (
      shelter_id uuid DEFAULT gen_random_uuid() NOT NULL,
      sosrs_id uuid NULL,
      name varchar(255) NOT NULL,
      pix varchar(255) NULL,
      address varchar(255) NOT NULL,
      street varchar(255),
      neighbourhood varchar(255),
      city varchar(255),
      street_number varchar(255),
      zip_code varchar(255),
      capacity integer,
      pet_friendly boolean,
      sheltered_people integer,
      priority_sum integer NOT NULL DEFAULT 0,
      verified boolean NOT NULL DEFAULT false,
      latitude numeric(8,6),
      longitude numeric(9,6),
      actived boolean NOT NULL DEFAULT false,
      category varchar(255) NOT NULL,
      created_at timestamptz DEFAULT now() NOT NULL,
      updated_at timestamptz DEFAULT now() NOT NULL,
      CONSTRAINT shelters_pkey PRIMARY KEY (shelter_id)
    );
    CREATE UNIQUE INDEX shelters_shelter_id ON public.shelters (shelter_id);
    CREATE UNIQUE INDEX shelters_sosrs_id ON public.shelters (sosrs_id);
  `);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Down');

  await queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS public.shelters;
  `);
};
