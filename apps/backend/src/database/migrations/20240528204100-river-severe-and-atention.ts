import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Up');

  await queryInterface.sequelize.query(`
    ALTER TABLE public.rivers ADD COLUMN IF NOT EXISTS severe_flood_value integer;
    ALTER TABLE public.rivers ADD COLUMN IF NOT EXISTS attention_value integer;
  `);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Down');

  await queryInterface.sequelize.query(`
    ALTER TABLE public.rivers DROP COLUMN IF EXISTS severe_flood_value;
    ALTER TABLE public.rivers DROP COLUMN IF EXISTS attention_value;
  `);
};
