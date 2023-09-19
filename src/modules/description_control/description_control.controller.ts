import { Controller, Get, UseGuards, Req, Post, Body, HttpException, HttpStatus, Param, Put } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { DescriptionControlService } from './description_control.service';
import { DescriptionControlDto } from './dto/description_control.dto';
import { DescriptionControl } from './description_control.entity';


@UseGuards(JwtGuard)
@Controller('api/description_controls')

export class DescriptionControlController{
    constructor(private readonly descriptionControlService:DescriptionControlService){

    }
    @Get()
    async getAllDescriptionControl(){
        try {
            const descriptionControls= await this.descriptionControlService.findAllDescriptionControl()
            return descriptionControls
        } catch (error) {
            throw new HttpException('Bad request at getting description controls',HttpStatus.BAD_REQUEST)

        }
    }
    @Get(':inspectionplan_id')
    async getDescriptionById(@Param('inspection_id') inspection_id:number) {
        try {
            const inspectionId=await this.descriptionControlService.findByInspectionPlanId(inspection_id)
            return inspectionId
        } catch (error) {
            throw new HttpException('Bad request at getDescriptionById',HttpStatus.BAD_REQUEST)

        }
    }
    // @Post()
    // async createDescriptionControl(@Body() descriptionControl:DescriptionControlDto,@Param('inspectionplan_id') inspectionplan_id:number): Promise<DescriptionControl>{
    //     const document_url = document
    //     //? await uploadFile(document.buffer, document.originalname)
    //     //: null;
  
    //   // Check if a record exists with the given inspectionplan_id
    //   const existingRecord = await this.descriptionControlService.findByInspectionPlanId(inspectionplan_id);
  
    //   if (existingRecord) {
    //     // If a record exists, update it
    //     throw await this.descriptionControlService.update(inspectionplan_id,descriptionControl)
    //   } else {
    //     // If no record exists, create a new one
    //     return  await this.descriptionControlService.createDescriptionControl(descriptionControl)
    //   }
    // }

    @Put(':id')
        async updateInspectionPlanById(@Param('id') id: number, @Body() fieldsToUpdate: Record<string, any>) {
            const updatedPlan = await this.descriptionControlService.update(id, fieldsToUpdate);
            if (!updatedPlan) {
                throw new HttpException('Update failed', HttpStatus.BAD_REQUEST);
            }
            return updatedPlan;
        }

}
