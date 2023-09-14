import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WORKSTEPS_REPOSITORY } from 'src/core/constants';
import { WorkSteps } from './work-steps.entity';
import { WorkStepsDto } from './dto/work-steps.dto';

@Injectable()
export class WorkStepsService {
  constructor(
    @Inject(WORKSTEPS_REPOSITORY)
    private readonly workStepsRepository: typeof WorkSteps,
  ) {}
  //CREATE WORK STEP
  async postWorkSteps(workStep: WorkStepsDto): Promise<WorkSteps> {
    return await this.workStepsRepository.create(workStep);
  }

  //GET WORK STEP BY ID
  async getWorkStepById(id: number): Promise<WorkSteps> {
    const workStep = await this.workStepsRepository.findByPk(id);

    return workStep;
  }

  //GET WORK STEP BY STATUS
  async getWorkStepByStatus(status: string) {
    const workStep = await this.workStepsRepository.findAll<WorkSteps>({
      where: { status },
    });

    return workStep;
  }

  //UPDATE WORK STEP BY ID
  async updateWorkStep(id: number, workStep: WorkStepsDto) {
    try {
      const [updatedRowCount, [updatedWorkStep]] =
        await this.workStepsRepository.update(workStep, {
          where: { id },
          returning: true,
        });

      if (updatedRowCount === 0) {
        throw new NotFoundException('Selected workStep is not found !');
      }

      return updatedWorkStep as WorkSteps;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //DELETE WORK STEP BY ID
  async deleteWorkStep(id: number): Promise<void> {
    this.workStepsRepository.destroy({ where: { id } });
  }
}
