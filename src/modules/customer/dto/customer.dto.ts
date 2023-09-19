import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PrimaryKey } from "sequelize-typescript";


export class CustomerDto {

   
    @IsNotEmpty()
    @IsString()
    readonly name:string
    @IsNotEmpty()
    @IsNumber()
    readonly odooid:number

}