import { LOCATION_REPOSITORY } from '../../core/constants';
import { Location } from './location.entity';

export const locationProviders = [
  {
    provide: LOCATION_REPOSITORY,
    useValue: Location,
  },
];
