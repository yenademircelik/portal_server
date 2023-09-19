import { Inject, Injectable } from "@nestjs/common";
import { LOCATION_REPOSITORY } from "src/core/constants";
import { LocationDto } from "./dto/location.dto";
import { Location } from "./location.entity";
import { Sequelize } from "sequelize-typescript";
import { Op, fn, col } from 'sequelize';




@Injectable()
export class LocationService {
    constructor(
        @Inject(LOCATION_REPOSITORY) private readonly locationRepository: typeof Location,
    ) { }

    async createLocation(location: LocationDto): Promise<Location> {
        return await this.locationRepository.create(location);
    }

    async getAllLocations(): Promise<Location[]> {
        return await this.locationRepository.findAll()
    }
    async findLatestByNames() {
        const results = await this.locationRepository.findAll({
            attributes: [
                'name',
                'atitude', // atitude sütunu burada dahil edildi
                [Sequelize.fn('MAX', Sequelize.col('longitude')), 'latestLongitude'],
                [Sequelize.fn('MAX', Sequelize.col('timestamp')), 'latestTimeStamp'],
            ],
            group: ['name', 'atitude'], // atitude sütunu gruplama işlemine dahil edildi
            raw: true,
        });
    
        console.log(results);
        return results;
    }
}

