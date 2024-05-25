import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Up');

  await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS public.supplies (
      supply_id uuid DEFAULT gen_random_uuid() NOT NULL,
      sosrs_id uuid NULL,
      supply_category_id uuid NOT NULL,
      name varchar(255) NOT NULL,
      created_at timestamptz DEFAULT now() NOT NULL,
      updated_at timestamptz DEFAULT now() NOT NULL,
      CONSTRAINT supplies_pkey PRIMARY KEY (supply_id)
    );
    CREATE UNIQUE INDEX supplies_supply_id ON public.supplies (supply_id);
    CREATE UNIQUE INDEX supplies_sosrs_id ON public.supplies (sosrs_id);

    ALTER TABLE public.supplies ADD CONSTRAINT supplies_supply_category_id_fkey FOREIGN KEY (supply_category_id) REFERENCES public.supply_categories(supply_category_id) ON DELETE CASCADE ON UPDATE CASCADE;
  `);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Down');

  await queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS public.supplies;
  `);
};
