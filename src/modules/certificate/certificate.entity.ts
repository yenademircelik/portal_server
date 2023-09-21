import { Table ,Model, Column, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { InspectionPlan } from "../inspectionplan/inspectionplan.entity";
import { Col } from "sequelize/types/utils";


@Table

export class Certificate extends Model<Certificate>{
   
    @Column(
        {
            type:DataType.INTEGER,
            allowNull:false,
        }
    )
    work_id:number
    @Column(
        {
            type:DataType.STRING,
            allowNull:false,
        }
    )
    certificates:string
    @Column(
        {
            type:DataType.INTEGER,
            allowNull:false,
        }
    )
    product_id:number
    @Column(
        {
            type:DataType.INTEGER,
            allowNull:false,
        }
    )
    step_id:number


   

}