import { Controller } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";



@Controller('api/description_controls')

export class DescriptionControlDto {

    @IsNumber()
    @IsNotEmpty()
    inspectionplan_id:number
    @IsString()
    @IsNotEmpty()
    description:string
    @IsString()
    @IsNotEmpty()
    documents:string
    @IsNumber()
    @IsNotEmpty()
    creator_id:number
    @IsNotEmpty()
    creation_date:Date

}