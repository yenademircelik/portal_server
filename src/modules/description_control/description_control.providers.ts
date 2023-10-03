import { DESCRIPTIONCONTROL_REPOSITORY } from '../../core/constants';
import { DescriptionControl } from './description_control.entity';

export const descriptionControlProviders = [
  {
    provide: DESCRIPTIONCONTROL_REPOSITORY,
    useValue: DescriptionControl,
  },
];
