import { Inject, Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { Sequelize } from 'sequelize';
import { Constants } from 'src/constants';
import { seedTestData } from 'src/database/seeders/test-data';

@Injectable()
export class DevService {
  private logger = new Logger('DevService');

  constructor(
    @Inject(Constants.SEQUELIZE)
    private sequelize: Sequelize,
  ) {}

  async dropSchema() {
    this.logger.log(`Dropping schema`);
    await this.sequelize.dropSchema('public', { logging: true });
  }

  async createSchema() {
    this.logger.log(`Creating schema`);
    await this.sequelize.createSchema('public', { logging: true });
  }

  async migrate() {
    this.logger.log(`Migrating database`);
    await new Promise<void>((resolve, reject) => {
      const migrate = exec('npm run migrate', { env: process.env }, (err) => (err ? reject(err) : resolve()));
      migrate.stdout?.pipe(process.stdout);
      migrate.stderr?.pipe(process.stderr);
    });
  }

  async seedTestData() {
    this.logger.log(`Running seed test data`);
    const queryInterface = this.sequelize.getQueryInterface();
    await seedTestData(queryInterface);
  }

  async prepareForTests() {
    this.logger.log(`Preparing for tests`);
    await this.dropSchema();
    await this.createSchema();
    await this.migrate();
    await this.seedTestData();
    this.logger.log(`Successfully prepared for tests`);
  }
}
