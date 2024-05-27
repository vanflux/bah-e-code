import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Up');

  await queryInterface.sequelize.query(`
    DELETE FROM water_levels  T1
    USING   water_levels T2
    WHERE   T1.water_level_id < T2.water_level_id 
    AND T1.city = T2.city 
    AND T1.date  = T2.date;

    CREATE UNIQUE INDEX water_levels_city_date_idx on water_levels (city, date);
  `);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  console.log('Down');

  await queryInterface.sequelize.query(`
  DROP INDEX water_levels_city_date_idx;
  `);
};
