import { WORKSTEPS_REPOSITORY } from 'src/core/constants';
import { WorkSteps } from './work-steps.entity';

export const workStepsProvider = [
  {
    provide: WORKSTEPS_REPOSITORY,
    useValue: WorkSteps,
  },
];
