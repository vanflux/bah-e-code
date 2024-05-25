import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Up');

  await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS public.supply_categories (
      supply_category_id uuid DEFAULT gen_random_uuid() NOT NULL,
      sosrs_id uuid NULL,
      name varchar(255) NOT NULL,
      created_at timestamptz DEFAULT now() NOT NULL,
      updated_at timestamptz DEFAULT now() NOT NULL,
      CONSTRAINT supply_categories_pkey PRIMARY KEY (supply_category_id)
    );
    CREATE UNIQUE INDEX supply_categories_supply_category_id ON public.supply_categories (supply_category_id);
    CREATE UNIQUE INDEX supply_categories_sosrs_id ON public.supply_categories (sosrs_id);
  `);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Down');

  await queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS public.supply_categories;
  `);
};
