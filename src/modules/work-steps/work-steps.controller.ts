import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { WorkStepsService } from './work-steps.service';
import { WorkStepsDto } from './dto/work-steps.dto';

@UseGuards(JwtGuard)
@Controller('workSteps')
export class WorkStepsController {
  constructor(private readonly workStepService: WorkStepsService) {}

  @Post()
  async postWorkStep(@Body() workStep: WorkStepsDto) {
    return await this.workStepService.postWorkSteps(workStep);
  }

  @Get(':id')
  async getWorkStepById(@Param('id') id: number) {
    const workStep = await this.workStepService.getWorkStepById(id);

    if (!workStep) {
      return new NotFoundException('Workstep is not found !');
    }
    return { workStep };
  }

  @Get()
  async getWorkStepByStatus(@Query('status') status: string) {
    const workStep = await this.workStepService.getWorkStepByStatus(status);

    if (!workStep) {
      return new NotFoundException('Workstep is not found !');
    }
    return { workStep };
  }

  @Put(':id')
  async updateWorkStep(
    @Param('id') id: number,
    @Body() workStep: WorkStepsDto,
  ) {
    const updatedWorkStep = await this.workStepService.updateWorkStep(
      id,
      workStep,
    );

    if (!updatedWorkStep) {
      return new NotFoundException('Workstep is not found !');
    }

    return {
      message: 'WorkStep successfully updated !',
      updatedWorkStep: updatedWorkStep,
    };
  }

  @Delete(':id')
  async deleteWorkStep(@Param('id') id: number) {
    const deletedWorkStep = await this.workStepService.getWorkStepById(id);

    if (!deletedWorkStep) {
      return new NotFoundException('Workstep is not found !');
    }
    const workStep = await this.workStepService.deleteWorkStep(id);

    return { message: 'Successfully deleted !', workStep };
  }
}
