import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Up');

  await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS public.water_levels (
      water_level_id uuid DEFAULT gen_random_uuid() NOT NULL,
      city varchar(255) NOT NULL,
      value integer NOT NULL,
      date timestamptz NOT NULL,
      CONSTRAINT water_levels_pkey PRIMARY KEY (water_level_id)
    );
  `);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Down');

  await queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS public.water_levels;
  `);
};
