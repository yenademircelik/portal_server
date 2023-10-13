import {
  Controller,
  UseGuards,
  Get,
  Post,
  NotFoundException,
  Body,
  HttpException,
  HttpStatus,
  Delete,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { InspectionPlan } from './inspectionplan.entity';

import { InspectionPlanService } from './inspectionplan.service';
import { InspectionPlanDto } from './dto/inspectionplan.dto';
import { error } from 'console';

@UseGuards(JwtGuard)
@Controller('inspectionplans')
export class InspectionPlanController {
  constructor(private readonly inspectionPlanService: InspectionPlanService) {}
  @Get()
  async getInspectionPlans() {
    const inspectionPlans =
      await this.inspectionPlanService.getAllInspectionPlan();
    if (!inspectionPlans) {
      throw new NotFoundException('Inspection Plan Not Found!');
    }
    return { inspectionPlans };
  }
  @Post()
  async createInspectionPlans(@Body() inspectionPlan: InspectionPlanDto) {
    const inspectionPlans =
      await this.inspectionPlanService.createInspectionPlan(inspectionPlan);
    try {
      return inspectionPlans;
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
  @Get('opendraft')
  async getOpenDraftInspectionPlans(
    @Query('state') state: string,
    @Query('status') status: string,
  ) {
    const inspectionPlan = await this.inspectionPlanService.getByStateAndStatus(
      (state = 'Open'),
      (status = 'Draft'),
    );
    if (!(state && status)) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return inspectionPlan;
  }
  @Get('opendraft')
  async getOpenWaitingInspectionPlans(
    @Query('state') state: string,
    @Query('status') status: string,
  ) {
    const inspectionPlan = await this.inspectionPlanService.getByStateAndStatus(
      (state = 'Open'),
      (status = 'Waiting'),
    );
    if (!(state && status)) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return inspectionPlan;
  }
  @Get('closed')
  async getCLosedInspectionPlans(@Query('closed') state: string) {
    const inspectionPlan = await this.inspectionPlanService.getByState(
      (state = 'Closed'),
    );
    if (!inspectionPlan) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return inspectionPlan;
  }

  @Delete(':vendor_odooid')
  async deleteInspectionPlanById(
    @Param('vendor_odooid') vendor_odooid: number,
  ) {
    const deleteInspectionPlan =
      await this.inspectionPlanService.delete(vendor_odooid);

    console.log('Successfully Deleted!', deleteInspectionPlan);
    return deleteInspectionPlan;
  }
  @Put(':vendor_odooid')
  async updateInspectionPlanById(
    @Param('vendor_odooid') vendor_odooid: number,
    @Body() fieldsToUpdate: Record<string, any>,
  ) {
    const updatedPlan = await this.inspectionPlanService.update(
      vendor_odooid,
      fieldsToUpdate,
    );
    if (!updatedPlan) {
      throw new HttpException('Update failed', HttpStatus.BAD_REQUEST);
    }
    return updatedPlan;
  }
}
