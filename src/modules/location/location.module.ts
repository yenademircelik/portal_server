import { Module } from "@nestjs/common";
import { locationProviders } from "./location.providers";
import { LocationService } from "./location.service";
import { LocationController } from "./location.controller";



@Module({
    providers:[LocationService,...locationProviders],
    exports:[LocationService],
    controllers:[LocationController],
})
export class LocationModule{}