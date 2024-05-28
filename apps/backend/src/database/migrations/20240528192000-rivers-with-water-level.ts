import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Up');

  await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS public.rivers (
      river_id uuid DEFAULT gen_random_uuid() NOT NULL,
      name varchar(255) NOT NULL,
      city varchar(255) NOT NULL,
      alert_value integer,
      flood_value integer,
      created_at timestamptz DEFAULT now() NOT NULL,
      updated_at timestamptz DEFAULT now() NOT NULL,
      CONSTRAINT rivers_pkey PRIMARY KEY (river_id)
    );
    INSERT INTO public.rivers (name, city)
    VALUES ('Guaíba', 'Porto Alegre');

    DROP TABLE IF EXISTS public.water_levels;
    CREATE TABLE IF NOT EXISTS public.water_levels (
      water_level_id uuid DEFAULT gen_random_uuid() NOT NULL,
      river_id uuid NOT NULL,
      value integer NOT NULL,
      date timestamptz NOT NULL,
      CONSTRAINT water_levels_pkey PRIMARY KEY (water_level_id)
    );
    ALTER TABLE public.water_levels ADD CONSTRAINT water_levels_river_id_fkey FOREIGN KEY (river_id) REFERENCES public.rivers(river_id) ON DELETE CASCADE ON UPDATE CASCADE;
    CREATE UNIQUE INDEX water_levels_river_id_date_idx on water_levels (river_id, date DESC);
  `);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Down');

  await queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS public.water_levels;
    CREATE TABLE IF NOT EXISTS public.water_levels (
      water_level_id uuid DEFAULT gen_random_uuid() NOT NULL,
      city varchar(255) NOT NULL,
      value integer NOT NULL,
      date timestamptz NOT NULL,
      CONSTRAINT water_levels_pkey PRIMARY KEY (water_level_id)
    );
    CREATE UNIQUE INDEX water_levels_city_date_idx on water_levels (city, date);
    
    DROP TABLE IF EXISTS public.rivers;
  `);
};
