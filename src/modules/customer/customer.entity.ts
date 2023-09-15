import { Table,Model, Column, DataType} from "sequelize-typescript";


@Table

export class Customer extends Model<Customer>{

  
    @Column({
        type:DataType.STRING,
        allowNull:false

    })
    name:string
    @Column({
        type:DataType.INTEGER,
        unique:true,
        
        allowNull:false,
    })
    odooid:number


}