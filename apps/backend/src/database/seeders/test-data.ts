import { QueryInterface } from 'sequelize';

export const seedTestData = async (queryInterface: QueryInterface) => {
  return up(queryInterface);
};

export const up = async (queryInterface: QueryInterface) => {
  console.log('Up');

  await queryInterface.sequelize.query(`
    -- Users
    INSERT INTO public.users (user_id, cpf)
    VALUES('00000001-0000-0000-0000-000000000001'::uuid, '22558850008');
  `);
};

export const down = async () => {
  console.log('Down');
};
