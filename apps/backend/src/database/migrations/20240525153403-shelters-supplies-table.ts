import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Up');

  await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS public.shelters_supplies (
      shelter_supply_id uuid DEFAULT gen_random_uuid() NOT NULL,
      shelter_id uuid NOT NULL,
      supply_id uuid NOT NULL,
      priority integer NOT NULL,
      quantity integer,
      created_at timestamptz DEFAULT now() NOT NULL,
      updated_at timestamptz DEFAULT now() NOT NULL,
      CONSTRAINT shelters_supplies_pkey PRIMARY KEY (shelter_supply_id)
    );
    CREATE UNIQUE INDEX shelters_supplies_shelter_supply_id ON public.shelters_supplies (shelter_supply_id);

    ALTER TABLE public.shelters_supplies ADD CONSTRAINT shelters_supplies_shelter_id_fkey FOREIGN KEY (shelter_id) REFERENCES public.shelters(shelter_id) ON DELETE CASCADE ON UPDATE CASCADE;
    ALTER TABLE public.shelters_supplies ADD CONSTRAINT shelters_supplies_supply_id_fkey FOREIGN KEY (supply_id) REFERENCES public.supplies(supply_id) ON DELETE CASCADE ON UPDATE CASCADE;
  `);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Down');

  await queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS public.shelters_supplies;
  `);
};
