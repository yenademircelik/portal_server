import { Table ,Model, Column, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { InspectionPlan } from "../inspectionplan/inspectionplan.entity";
import { Col } from "sequelize/types/utils";


@Table

export class DescriptionControl extends Model<DescriptionControl>{
    @ForeignKey(() => InspectionPlan)
    @Column(
        {
            type:DataType.NUMBER,
            allowNull:false,
        }
    )
    inspectionplan_id:number
    @BelongsTo(() => InspectionPlan)
    inspectionPlan: InspectionPlan;

    @Column
    ({
        type:DataType.STRING
        
    })
    description:string
    @Column
    ({
        type:DataType.STRING
        
    })
    documents:string
    @Column
    ({
        type:DataType.NUMBER
        
    })
    creator_id:number
    @Column({
        type:DataType.DATE,
        allowNull:false,
    })
    creation_date:Date;

}