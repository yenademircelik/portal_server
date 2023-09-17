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
    //TODO: SQL İlişkisi eklenecek.
    async findLatestByNames(): Promise<Location[]> {
        return await this.locationRepository.findAll({
            attributes: ['name', 'latitude', 'longitude', 'timestamp'],
            include: [
                {
                    model: Location,
                    as: 'subq',
                    attributes: [
                        [fn('MAX', col('timestamp')), 'maxTimeStamp']
                    ],
                    where: {
                        name: col('location.name')
                    },
                    duplicating: false,
                    required: true
                }
            ],
            where: {
                timestamp: col('subq.maxTimeStamp')
            },
            group: ['name']
        });
    }
}

