import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class VendorDto {

   
    @IsNotEmpty()
    @IsString()
    readonly name:string
    @IsNotEmpty()
    @IsNumber()
    readonly odooid:number

}