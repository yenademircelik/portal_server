import { Controller, UseGuards, Get,Post, NotFoundException, Body, HttpException, HttpStatus, Delete, Param, Put } from "@nestjs/common";
import { JwtGuard } from "../auth/guard/jwt.guard";
import { InspectionPlan } from "./inspectionplan.entity";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { GetInspectionPlans } from "./decorators/get_inspectionplan.decorator";
import { InspectionPlanService } from "./inspectionplan.service";
import { InspectionPlanDto } from "./dto/inspectionplan.dto";

@Controller('api')

export class InspectionPlanController{
    constructor(private readonly inspectionPlanService:InspectionPlanService){}
        @UseGuards(JwtGuard)
        @Get('inspectionplans')
        async getInspectionPlans(){
            const inspectionPlans = await this.inspectionPlanService.getAllInspectionPlan();
            if(!inspectionPlans){
                return new NotFoundException('Inspection Plan Not Found!')
            }
            return {inspectionPlans}
        
        } 
        @Post('inspectionplans')
        async createInspectionPlans (@Body() inspectionPlan: InspectionPlanDto){
            const inspectionPlans = await this.inspectionPlanService.createInspectionPlan(inspectionPlan)
            try {
                return(inspectionPlan)
            } catch (error) {
                throw new HttpException('Bad Request',HttpStatus.BAD_REQUEST)
           }
            
        }
        @Get('inspectionplans/opendraft')
        async getOpenDraftInspectionPlans (@Param('state') state:string,@Param('status')status:string){
            const inspectionPlan=await this.inspectionPlanService.getByStateAndStatus(state="Open",status="Draft")
            if (!(state&&status))
            {
                return new HttpException('Bad Request',HttpStatus.BAD_REQUEST)
            }
                return inspectionPlan;
        }
        @Get('inspectionplans/openwaiting')
        async getCLosedInspectionPlans (@Param('closed') state:string){
            const inspectionPlan=await this.inspectionPlanService.getByState(state="Closed")
            if (!state)
            {
                return new HttpException('Bad Request',HttpStatus.BAD_REQUEST)
            }
                return inspectionPlan;
        }

        @Delete(':id')
        async deleteInspectionPlanById(@Param('vendor_odooid') vendor_odooid:number){
            const deleteInspectionPlan=await this.inspectionPlanService.delete(vendor_odooid)
            if (!deleteInspectionPlan){
                return new HttpException('Bad Request',HttpStatus.BAD_REQUEST)
            }
        }
        @Put(':id')
        async updateInspectionPlanById(@Param('vendor_odooid') vendor_odooid:number, @Body() inspectionPlan:InspectionPlan){
            const updateInspectionPlan=await this.inspectionPlanService.update(vendor_odooid,inspectionPlan)
            if(!updateInspectionPlan){
                return new HttpException ('Bad request',HttpStatus.BAD_REQUEST)
            }
        }
                
        
    }
    
        



    
