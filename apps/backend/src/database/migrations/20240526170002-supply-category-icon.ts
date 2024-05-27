import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Up');

  await queryInterface.sequelize.query(`
    ALTER TABLE public.supply_categories ADD COLUMN IF NOT EXISTS icon varchar(255);
  `);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Down');

  await queryInterface.sequelize.query(`
    ALTER TABLE public.supply_categories DROP COLUMN IF EXISTS icon;
  `);
};
