import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Work } from '../../modules/works/works.entity';
import { InspectionPlan } from '../../modules/inspectionplan/inspectionplan.entity';
import { Customer } from '../../modules/customer/customer.entity';
import { Vendor } from '../../modules/vendor/vendor.entity';
import { Location } from '../../modules/location/location.entity';
import { DescriptionControl } from '../../modules/description_control/description_control.entity';
import { WorkSteps } from '../../modules/work-steps/work-steps.entity';
import { WorkProducts } from '../../modules/work-products/work-products.entity';
import { Products } from '../../modules/products/products.entity';
import { Certificate } from '../../modules/certificate/certificate.entity';
import { QaulityControl } from '../../modules/quality-control/quality-control.entity';
import { Images } from '../../modules/images/images.entity';

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
        Certificate,
      ]);

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
