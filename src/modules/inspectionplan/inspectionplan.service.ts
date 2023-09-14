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
 async getByStateAndStatus(state:string,status:string):Promise<InspectionPlan[]>{
    return await this.inspectionPlanRepository.findAll<InspectionPlan>({where: 
        Sequelize.and(
          { state},
          { status }
        )
    }
      )
    
 }
 async getAllInspectionPlan(): Promise <InspectionPlan[]>{
    return await this.inspectionPlanRepository.findAll<InspectionPlan>()
 }
 async getByState(state:string) : Promise <InspectionPlan[]> {
    return await this.inspectionPlanRepository.findAll({where:{state}})
 }

 async delete(vendor_odooid:number):Promise<InspectionPlan>{
    const deleteInspectionPlan= await this.inspectionPlanRepository.destroy({where:{vendor_odooid}})
    if (deleteInspectionPlan){
        Promise.resolve(deleteInspectionPlan)
    }else{
        return Promise.reject(error)
    }
 }
 async update(vendor_odooid: number, fieldsToUpdate: Record<string, any>): Promise<InspectionPlan[] | null> {
   const updateResult = await this.inspectionPlanRepository.update(fieldsToUpdate, {
       where: { vendor_odooid }
   });

   if (updateResult[0] === 0) { // Eğer hiçbir kayıt güncellenmediyse
       return null;
   }

   return this.inspectionPlanRepository.findAll({
       where: { vendor_odooid }
   });
}

}