import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Up');

  await queryInterface.sequelize.query(`
    ALTER TABLE public.addresses ADD COLUMN IF NOT EXISTS latitude numeric(8,6);
    ALTER TABLE public.addresses ADD COLUMN IF NOT EXISTS longitude numeric(9,6);
  `);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Down');

  await queryInterface.sequelize.query(`
    ALTER TABLE public.addresses DROP COLUMN IF EXISTS latitude;
    ALTER TABLE public.addresses DROP COLUMN IF EXISTS longitude;
  `);
};
