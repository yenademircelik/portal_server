import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { LocationService } from "./location.service";
import { JwtGuard } from "../auth/guard/jwt.guard";
import { LocationDto } from "./dto/location.dto";
import { Location } from "./location.entity";

@UseGuards(JwtGuard)
@Controller('api/locations')

export class LocationController {
    constructor (private readonly locationService:LocationService){}

    @Get()
    async getAllLocation () {
        const locations = await this.locationService.getAllLocations()
        try {  
            return (locations)
            
        } catch (error) {
            throw new HttpException('Bad Request at GetAllLocations',HttpStatus.BAD_REQUEST)

            
        }
    }
    
    @Post()
    async createLocations (@Body() location:LocationDto): Promise<Location>{
        const locations=await this.locationService.createLocation(location)
        try {
            return (locations)
        } catch (error) {
            throw new HttpException('Bad Request at create Locations',HttpStatus.BAD_REQUEST)

        }
    }

    @Get('latest')
    async getLatestLocation(){
        const location= await this.locationService.findLatestByNames()
        try {
            return (location)
        } catch (error) {
            throw new HttpException('Bad Request at get latest location',HttpStatus.BAD_REQUEST)

        }
    }



}


