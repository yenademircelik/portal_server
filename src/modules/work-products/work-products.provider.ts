import {
  WORKPRODUCTS_REPOSITORY,
  WORKSTEPS_REPOSITORY,
} from 'src/core/constants';
import { WorkProducts } from './work-products.entity';

export const workProductsProvider = [
  {
    provide: WORKPRODUCTS_REPOSITORY,
    useValue: WorkProducts,
  },
];
