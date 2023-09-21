import { QUALITY_CONTROL_REPOSITORY } from '../../core/constants';
import { QaulityControl } from './quality-control.entity';

export const qualityControlProviders = [
  {
    provide: QUALITY_CONTROL_REPOSITORY,
    useValue: QaulityControl,
  },
];
