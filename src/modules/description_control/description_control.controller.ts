import { Controller, Get, UseGuards,  Post, Body, HttpException, HttpStatus, Param, Put, UseInterceptors, UploadedFiles, InternalServerErrorException, Req, Res } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { DescriptionControlService } from './description_control.service';
import { DescriptionControlDto } from './dto/description_control.dto';
import { DescriptionControl } from './description_control.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { uploadFile } from '../utils/upload_azure';
import { Request, Response } from 'express';


@UseGuards(JwtGuard)
@Controller('api/description_controls')

export class DescriptionControlController{
    constructor(private readonly descriptionControlService:DescriptionControlService){

    }
    @Get()
    async getAllDescriptionControl(){
        try {
            const descriptionControls= await this.descriptionControlService.findAllDescriptionControl()
            return descriptionControls
        } catch (error) {
            throw new HttpException('Bad request at getting description controls',HttpStatus.BAD_REQUEST)

        }
    }
    @Get(':inspectionplan_id')
    async getDescriptionById(@Param('inspectionplan_id') inspectionplan_id:number) {
        try {
            const inspectionId=await this.descriptionControlService.findByInspectionPlanId(inspectionplan_id)
            return inspectionId
        } catch (error) {
            throw new HttpException('Bad request at getDescriptionById',HttpStatus.BAD_REQUEST)

        }
    }
    // @Post()
    // async createDescriptionControl(@Body() descriptionControl:DescriptionControlDto,@Param('inspectionplan_id') inspectionplan_id:number): Promise<DescriptionControl>{
    //     const document_url = document
    //     //? await uploadFile(document.buffer, document.originalname)
    //     //: null;
  
    //   // Check if a record exists with the given inspectionplan_id
    //   const existingRecord = await this.descriptionControlService.findByInspectionPlanId(inspectionplan_id);
  
    //   if (existingRecord) {
    //     // If a record exists, update it
    //     throw await this.descriptionControlService.update(inspectionplan_id,descriptionControl)
    //   } else {
    //     // If no record exists, create a new one
    //     return  await this.descriptionControlService.createDescriptionControl(descriptionControl)
    //   }
    // }
    @Post()
    @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'documents', maxCount: 1 },
    ]),
  )
    async createProduct(
        @UploadedFiles()
        files: {
          documents?: Express.Multer.File[];
        },
        @Req() req: Request,
        @Res() res: Response,
      ) {
        try {
          const { inspectionplan_id, description, creator_id,creation_date } = req.body;
    
          const document = files.documents 
            ? files.documents[0]
            : null;
    
          
    
          const document_url = document
            ? await uploadFile(
                document.buffer,
                document.originalname,
              )
            : null;
    
         
    
          const descriptionControlDto: DescriptionControlDto = {
            inspectionplan_id:inspectionplan_id,
            description: description,
            creator_id: creator_id,
            creation_date: creation_date,
            documents: document_url,
            
          };
    
          const result = await this.descriptionControlService.createDescriptionControl(descriptionControlDto);
          return res
            .status(HttpStatus.CREATED)
            .json({ message: 'Successfully Created', descriptionControl: result });
        } catch (err) {
          console.error(err);
          throw new InternalServerErrorException('Something went wrong !');
        }
      }

    @Put(':id')
        async updateInspectionPlanById(@Param('id') id: number, @Body() fieldsToUpdate: Record<string, any>) {
            const updatedPlan = await this.descriptionControlService.update(id, fieldsToUpdate);
           try {
            
             return updatedPlan;
           } catch (error) {
            throw new HttpException('Update failed', HttpStatus.BAD_REQUEST);

           }
        }

}
