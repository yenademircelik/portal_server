import { Controller } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";



@Controller('api/description_controls')

export class CertificateDto {

    @IsNumber()
    @IsNotEmpty()
    readonly work_id:number
    @IsString()
    certificate_url:any
  
    @IsNumber()
    @IsNotEmpty()
    readonly product_id:number
    @IsNumber()
    @IsNotEmpty()
    readonly step_id:number

}