import {  Column, DataType, Table, Model} from "sequelize-typescript";


@Table
export class InspectionPlan extends Model<InspectionPlan>{
    @Column({
        type: DataType.INTEGER,
        unique:true,
        allowNull:false,
    })
    vendor_odooid:number;

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    vendor_name:string;
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    customer_odooid:number;
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    customer_name:string;
    
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    product_odooid:number;
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    product_name:string;
    
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    order_id:number;
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    order_number:string;
    
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    quantity:number;
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    control_responsible:string;
    @Column({
        type:DataType.DATE,
        allowNull:false,
    })
    control_date:Date;
    
    @Column({
        type:DataType.DATE,
        allowNull:false,
    })
    delivery_date:Date;
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    status:string;
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    state:string;
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    control_type:string;
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    project_number:string;
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    note:string;
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    control_method:string;
    


}