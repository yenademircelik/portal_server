import { IsNotEmpty, IsNumber, IsString ,IsDate} from "class-validator";
import { PrimaryKey } from "sequelize-typescript";



export class InspectionPlanDto {
 
    @IsNotEmpty()
    @IsNumber()
    readonly vendor_odooid:number
    @IsNotEmpty()
    @IsString()
    readonly vendor_name:string
    @IsNotEmpty()
    @IsNumber()
    readonly customer_odooid:number
    @IsNotEmpty()
    @IsString()
    readonly customer_name:string
    @IsNotEmpty()
    @IsNumber()
    readonly product_odooid:number
    @IsNotEmpty()
    @IsString()
    readonly product_name:string
    @IsNotEmpty()
    @IsNumber()
    readonly order_id:number
    @IsNotEmpty()
    @IsString()
    readonly order_number:string
    @IsNotEmpty()
    @IsNumber()
    readonly quantity:number
    @IsNotEmpty()
    @IsString()
    readonly control_responsible:string
    @IsNotEmpty()
    
    readonly control_date:Date
    @IsNotEmpty()
    
    readonly delivery_date:Date
    @IsNotEmpty()
    @IsString()
    readonly status:string
    @IsNotEmpty()
    @IsString()
    readonly state:string
    @IsNotEmpty()
    @IsString()
    readonly control_type:string
    @IsNotEmpty()
    @IsString()
    readonly project_number:string
    @IsNotEmpty()
    @IsString()
    readonly note:string
    @IsNotEmpty()
    @IsString()
    readonly control_method:string

    
}