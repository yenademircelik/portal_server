import { Module } from "@nestjs/common";
import { InspectionPlanController } from "./inspectionplan.controller";
import { inspectionPlanProviders } from "./inspectionplan.providers";
import { InspectionPlanService } from "./inspectionplan.service";

@Module({
    providers:[InspectionPlanService,...inspectionPlanProviders],
    exports:[InspectionPlanService],
    controllers:[InspectionPlanController],
})
export class InspectionPlanModule{}