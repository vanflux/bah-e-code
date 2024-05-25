import { Logger, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Constants } from 'src/constants';
import { User } from './models/user.model';

export const databaseProviders: Provider[] = [
  {
    provide: Constants.SEQUELIZE,
    useFactory: async (configService: ConfigService) => {
      const logger = new Logger('Database');
      const host = configService.getOrThrow('db.postgres.host');
      const port = configService.getOrThrow('db.postgres.port');
      const username = configService.getOrThrow('db.postgres.username');
      const password = configService.getOrThrow('db.postgres.password');
      const database = configService.getOrThrow('db.postgres.database');
      const sequelize = new Sequelize({
        dialect: 'postgres',
        define: {
          underscored: true,
        },
        host,
        port,
        username,
        password,
        database,
        retry: {
          max: 3,
          backoffBase: 1000,
          report: (message, _, err) => {
            if (err) {
              logger.error(`Message: "${message}", Err:`);
              console.log(err);
            }
          },
        },
        logging: false,
        benchmark: true,
      });
      sequelize.addModels([User]);
      return sequelize;
    },
    inject: [ConfigService],
  },
  {
    provide: Constants.USERS_REPOSITORY,
    useValue: User,
  },
];
