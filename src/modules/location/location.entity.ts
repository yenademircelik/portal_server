import { DecimalDataType,  } from "sequelize";
import { Column, DataType, Table,Model, IsDecimal } from "sequelize-typescript";



@Table
export class Location extends Model<Location>{


    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    name:string

    @Column({
        type: DataType.DECIMAL(30, 20), // 30 haneli toplam değer, 20 haneli ondalık kısım
        allowNull: false
    })
    
    atitude: number;
    
    @Column({
        type: DataType.DECIMAL(30, 20), // 30 haneli toplam değer, 20 haneli ondalık kısım
        allowNull: false
    })
    
    longitude: number;
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    timestamp:string

}