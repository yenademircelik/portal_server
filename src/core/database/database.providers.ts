import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from 'src/modules/users/user.entity';
import { Work } from 'src/modules/works/works.entity';
import { InspectionPlan } from 'src/modules/inspectionplan/inspectionplan.entity';
import { Customer } from 'src/modules/customer/customer.entity';
import { Vendor } from 'src/modules/vendor/vendor.entity';
import { Location } from 'src/modules/location/location.entity';
import { DescriptionControl } from 'src/modules/description_control/description_control.entity';
import { WorkSteps } from 'src/modules/work-steps/work-steps.entity';
import { WorkProducts } from 'src/modules/work-products/work-products.entity';
import { Products } from 'src/modules/products/products.entity';
import { QaulityControl } from 'src/modules/quality-control/quality-control.entity';
import { Images } from 'src/modules/images/images.entity';

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

      sequelize.addModels([
        User,
        Work,
        InspectionPlan,
        Customer,
        Vendor,
        Location,
        DescriptionControl,
        WorkSteps,
        WorkProducts,
        Products,
        QaulityControl,
        Images,
      ]);

      await sequelize.sync();
      return sequelize;
    },
  },
];
