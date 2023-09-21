import { Controller, Get, UseGuards,  Post, Body, HttpException, HttpStatus, Param, Put, UseInterceptors, UploadedFiles, InternalServerErrorException, Req, Res } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { uploadFile } from '../utils/upload_azure';
import { Request, Response } from 'express';
import { CertificateDto } from './dto/certificate.dto';
import { CertificateService } from './certificate.service';


@UseGuards(JwtGuard)
@Controller('api/certificate')

export class CertificateController{
    constructor(private readonly certificateService:CertificateService){

    }
    @Get()
    async getAllcertificate(){
        try {
            const certificates= await this.certificateService.findAllCertificate()
            return certificates
        } catch (error) {
            throw new HttpException('Bad request at getting description controls',HttpStatus.BAD_REQUEST)

        }
    }
    @Get(':id')
    async getCertificate(@Param('id') id:number) {
        try {
            const inspectionId=await this.certificateService.findByIdCertificate(id)
            return inspectionId
        } catch (error) {
            throw new HttpException('Bad request at getDescriptionById',HttpStatus.BAD_REQUEST)

        }
    }
    // @Post()
    // async createcertificate(@Body() certificate:certificateDto,@Param('inspectionplan_id') inspectionplan_id:number): Promise<certificate>{
    //     const document_url = document
    //     //? await uploadFile(document.buffer, document.originalname)
    //     //: null;
  
    //   // Check if a record exists with the given inspectionplan_id
    //   const existingRecord = await this.certificateService.findByInspectionPlanId(inspectionplan_id);
  
    //   if (existingRecord) {
    //     // If a record exists, update it
    //     throw await this.certificateService.update(inspectionplan_id,certificate)
    //   } else {
    //     // If no record exists, create a new one
    //     return  await this.certificateService.createcertificate(certificate)
    //   }
    // }
    @Post()
    @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'certificates', maxCount: 1 },
    ]),
  )
    async createCertificate(
        @UploadedFiles()
        files: {
          certificates?: Express.Multer.File[];
         
        },
        @Req() req: Request,
        @Res() res: Response,
      ) {
        try {
          const { work_id, product_id, step_id } = req.body;
    
          const certificate = files.certificates
            ? files.certificates[0]
            : null;
    
          
    
          const certificate_url = certificate
            ? await uploadFile(
                certificate.buffer,
                certificate.originalname,
              )
            : null;
    
         
    
          const certificateDto: CertificateDto = {
            work_id:work_id,
            certificates:certificate_url,
            product_id:product_id,
            step_id:step_id
            
          };
    
          const result = await this.certificateService.createCertificate(certificateDto);
          return res
            .status(HttpStatus.CREATED)
            .json({ message: 'Successfully Created', product: result });
        } catch (err) {
          console.error(err);
          throw new InternalServerErrorException('Something went wrong !');
        }
      }

    @Put(':id')
        async updateInspectionPlanById(@Param('id') id: number, @Body() fieldsToUpdate: Record<string, any>) {
            const updatedPlan = await this.certificateService.update(id, fieldsToUpdate);
           try {
            
             return updatedPlan;
           } catch (error) {
            throw new HttpException('Update failed', HttpStatus.BAD_REQUEST);

           }
        }

}
