import { Controller } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";



@Controller('api/description_controls')

export class DescriptionControlDto {

    @IsNumber()
    @IsNotEmpty()
    readonly inspectionplan_id:number
    @IsString()
    @IsNotEmpty()
    readonly description:string
    @IsNotEmpty()
    documents:any
    @IsNumber()
    @IsNotEmpty()
    readonly creator_id:number
    @IsNotEmpty()
    readonly creation_date:Date

}