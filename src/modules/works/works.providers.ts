import { WORK_REPOSITORY } from 'src/core/constants';
import { Work } from './works.entity';

export const worksProvider = [
  {
    provide: WORK_REPOSITORY,
    useValue: Work,
  },
];
