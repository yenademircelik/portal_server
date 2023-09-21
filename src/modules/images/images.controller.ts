import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ImageDto } from './dto/image.dto';
import { Request, Response } from 'express';

@UseGuards(JwtGuard)
@Controller('images')
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}

  @Post()
  async createImage(@Body() imageDto: ImageDto, @Res() res: Response) {
    const newImage = await this.imageService.createImage(imageDto);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Successfully created !', newImage: newImage });
  }

  @Get(':qualityControlId')
  async getImageByQualityControlId(
    @Param('qualityControlId') qualityControlId: number,
    @Res() res: Response,
  ) {
    const image =
      await this.imageService.getImageByQaulityControlId(qualityControlId);

    if (!image) {
      throw new NotFoundException('Selected image is not found !');
    }

    return res
      .status(200)
      .json({ message: 'Successfully fetched !', selectedImage: image });
  }

  @Put(':id')
  async updateImageStatus(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const imageStatus = req.body.status;

    const updatedImage = await this.imageService.updateImageStatus(
      imageStatus,
      id,
    );

    if (!updatedImage) {
      throw new NotFoundException('Selected image is not found !');
    }

    return res
      .status(HttpStatus.CREATED)
      .json({
        message: 'Status successfully updated !',
        updatedImage: updatedImage,
      });
  }
}
