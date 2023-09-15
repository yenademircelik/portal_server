import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from 'src/modules/users/user.entity';
import { Work } from 'src/modules/works/works.entity';
import { InspectionPlan } from 'src/modules/inspectionplan/inspectionplan.entity';
import { Customer } from 'src/modules/customer/customer.entity';
import { Vendor } from 'src/modules/vendor/vendor.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV as any) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Work,InspectionPlan,Customer,Vendor]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
