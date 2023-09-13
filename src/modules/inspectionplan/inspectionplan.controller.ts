import { Controller, UseGuards, Get,Post } from "@nestjs/common";
import { JwtGuard } from "../auth/guard/jwt.guard";
import { InspectionPlan } from "./inspectionplan.entity";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { GetInspectionPlans } from "./decorators/get_inspectionplan.decorator";
import { InspectionPlanService } from "./inspectionplan.service";

@Controller('api')

export class InspectionPlanController{
    constructor(private readonly inspectionPlanService:InspectionPlanService){}
        @UseGuards(JwtGuard)
        @Get('inspectionplans')
        async getInspectionPlans(
            @GetUser() inspectionPlan:InspectionPlan,@GetUser('customer-name') customer_name:string){
                console.log(customer_name);
                return inspectionPlan;
            }
        



    
}