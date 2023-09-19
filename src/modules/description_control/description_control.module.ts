import { Module } from "@nestjs/common";
import { Model } from "sequelize";
import { DescriptionControlService } from "./description_control.service";
import { descriptionControlProviders } from "./description_control.providers";
import { DescriptionControlController } from "./description_control.controller";



@Module({
    providers:[DescriptionControlService, ...descriptionControlProviders],
    exports:[DescriptionControlService],
    controllers:[DescriptionControlController]
})
export class DescriptionControlModule{}