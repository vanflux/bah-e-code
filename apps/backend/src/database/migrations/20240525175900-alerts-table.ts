import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Up');

  await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS public.alerts (
      alert_id uuid DEFAULT gen_random_uuid() NOT NULL,
      title varchar(255) NOT NULL,
      city varchar(255),
      body text NOT NULL,
      image_url text NOT NULL,
      created_at timestamptz DEFAULT now() NOT NULL,
      updated_at timestamptz DEFAULT now() NOT NULL,
      CONSTRAINT alerts_pkey PRIMARY KEY (alert_id)
    );
  `);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Down');

  await queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS public.alerts;
  `);
};
