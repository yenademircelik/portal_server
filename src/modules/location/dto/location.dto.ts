import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Timestamp } from "rxjs";
import { DecimalDataType } from "sequelize";
import { IsDecimal } from "sequelize-typescript";


export class LocationDto {
    @IsNotEmpty()
    @IsString()
    readonly name:string
    @IsNotEmpty()
    @IsNumber()
    readonly atitude:number
    @IsNotEmpty()
    @IsNumber()
    readonly longitude:number
    @IsNotEmpty()
    @IsString()
    readonly timestamp:string
    
}