import { INSPECTIONPLAN_REPOSITORY } from '../../core/constants';
import { InspectionPlan } from './inspectionplan.entity';

export const inspectionPlanProviders = [
  {
    provide: INSPECTIONPLAN_REPOSITORY,
    useValue: InspectionPlan,
  },
];
