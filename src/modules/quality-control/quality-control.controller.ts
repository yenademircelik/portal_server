import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { QualityControlService } from './quality-control.service';
import { QaulityControlDto } from './dto/quality-control.dto';
import { Request, Response } from 'express';

@UseGuards(JwtGuard)
@Controller('qualityControl')
export class QualityControlController {
  constructor(private readonly qualityControlService: QualityControlService) {}

  @Post()
  async createQualityControl(
    @Body() qualityControl: QaulityControlDto,
    @Res() res: Response,
  ) {
    const newQualityControl =
      await this.qualityControlService.createQualityControl(qualityControl);

    return res.status(HttpStatus.CREATED).json({
      message: 'Successfully created !',
      newQualityControl: newQualityControl,
    });
  }

  @Get('form/:formId/:workId')
  async getQualityControlWithFormIdAndWorkId(
    @Param('formId') formId: number,
    @Param('workId') workId: number,
    @Res() res: Response,
  ) {
    try {
      const qualityControl =
        await this.qualityControlService.findByFormIdAndWorkId(formId, workId);

      if (!qualityControl) {
        throw new NotFoundException('Selected qualityControl is not found !');
      }

      return res.status(200).json({
        message: `Successfully fetched qualityControl !`,
        qualityControl: qualityControl,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put(':id')
  async updateQualityControl(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { measured_value_1, measured_value_2, measured_value_3 } = req.body;

    const qualityControl =
      await this.qualityControlService.updateQaulityControl(
        id,
        measured_value_1,
        measured_value_2,
        measured_value_3,
      );

    if (!qualityControl) {
      throw new NotFoundException('QaulityControl is not found !');
    }

    return res.status(HttpStatus.CREATED).json({
      message: 'Successfully updated !',
      qualityControl: qualityControl,
    });
  }
}
