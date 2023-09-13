import { Inject, Injectable } from "@nestjs/common";
import { INSPECTIONPLAN_REPOSITORY } from "src/core/constants";
import { InspectionPlan } from "./inspectionplan.entity";
import { InspectionPlanDto } from "./dto/inspectionplan.dto";
import { Sequelize } from "sequelize";
import { error } from "console";


 @Injectable()
 export class InspectionPlanService{
    constructor(
        @Inject(INSPECTIONPLAN_REPOSITORY) private readonly inspectionPlanRepository:typeof InspectionPlan
    ){}

 async createInspectionPlan(inspectionPlan:InspectionPlanDto):Promise<InspectionPlan>{
    return await this.inspectionPlanRepository.create(inspectionPlan)
 }
 async getByStateAndStatus(state:string,status:string):Promise<InspectionPlan>{
    return await this.inspectionPlanRepository.findOne<InspectionPlan>({where: 
        Sequelize.or(
          { state},
          { status }
        )
    }
      )
    
 }
 async getAllInspectionPlan(): Promise <InspectionPlan[]>{
    return await this.inspectionPlanRepository.findAll<InspectionPlan>()
 }
 async getByState(state:string) : Promise <InspectionPlan> {
    return await this.inspectionPlanRepository.findOne({where:{state}})
 }

 async delete(vendor_odooid:number):Promise<InspectionPlan>{
    const deleteInspectionPlan= await this.inspectionPlanRepository.destroy({where:{vendor_odooid}})
    if (deleteInspectionPlan){
        Promise.resolve(deleteInspectionPlan)
    }else{
        return Promise.reject(error)
    }
 }
 async update(vendor_odooid:number,fieldsToUpdate: Record<string,any>):Promise <InspectionPlan>{
    const setClauses =Object.keys(fieldsToUpdate).map((fieldName)=>`${fieldName} = :${fieldName}`)
    const updateValues={...fieldsToUpdate,vendor_odooid}
    await this.inspectionPlanRepository.update(updateValues,{
        where: {vendor_odooid},
        returning:true,
    });

    return this.inspectionPlanRepository.findByPk(vendor_odooid)


} 

}