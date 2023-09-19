import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProductDto } from './dto/product.dto';
import { uploadFile } from '../utils/upload_azure';
import { Request, Response } from 'express';

@UseGuards(JwtGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  // @Post()
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: 'technicaldrawingurl', maxCount: 1 },
  //     { name: 'guideurl', maxCount: 1 },
  //   ]),
  // )
  // async createProduct(
  //   @UploadedFiles()
  //   files: {
  //     technicaldrawingurl?: Express.Multer.File[];
  //     guideurl?: Express.Multer.File[];
  //   },
  //   @Body() productDto: ProductDto,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const technical_drawing = files.technicaldrawingurl
  //       ? files.technicaldrawingurl[0]
  //       : null;
  //     const guide = files.guideurl ? files.guideurl[0] : null;

  //     productDto.technicalDrawingUrl = technical_drawing
  //       ? await uploadFile(
  //           technical_drawing.buffer,
  //           technical_drawing.originalname,
  //         )
  //       : null;
  //     productDto.guideUrl = guide
  //       ? await uploadFile(guide.buffer, guide.originalname)
  //       : null;

  //     const result = await this.productService.createProduct(productDto);
  //     return res
  //       .status(HttpStatus.CREATED)
  //       .json({ message: 'Successfully Created', product: result });
  //   } catch (err) {
  //     console.error(err);
  //     throw new InternalServerErrorException('Something went wrong !');
  //   }
  // }

  @Get()
  async getProducts() {
    const products = await this.productService.getProducts();

    if (!products) {
      throw new BadRequestException('Something went wrong !');
    }

    return { message: 'Successfully fethec products !', products: products };
  }

  @Get('productName')
  async getProductsByName(@Query('name') name: string) {
    const product = await this.productService.getProductByName(name);

    if (!product) {
      throw new NotFoundException(`Product with this name ${name} not found !`);
    }

    return { product };
  }

  @Get(':odooId')
  async getProductByOdooId(@Param('odooId') odooId: number) {
    const product = await this.productService.getProductByOdooId(odooId);

    if (!product) {
      throw new NotFoundException(
        `Product can not be found with this odooid ${odooId}`,
      );
    }

    return product;
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'technicaldrawingurl', maxCount: 1 },
      { name: 'guideurl', maxCount: 1 },
    ]),
  )
  async createProduct(
    @UploadedFiles()
    files: {
      technicaldrawingurl?: Express.Multer.File[];
      guideurl?: Express.Multer.File[];
    },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { name, odooId, customer, customerId } = req.body;

      const technical_drawing = files.technicaldrawingurl
        ? files.technicaldrawingurl[0]
        : null;

      const guideurl = files.guideurl ? files.guideurl[0] : null;

      const technical_drawing_url = technical_drawing
        ? await uploadFile(
            technical_drawing.buffer,
            technical_drawing.originalname,
          )
        : null;

      const guide_url = guideurl
        ? await uploadFile(guideurl.buffer, guideurl.originalname)
        : null;

      const productDto: ProductDto = {
        name: name,
        odooId: odooId,
        customer: customer,
        customerId: customerId,
        technicalDrawingUrl: technical_drawing_url,
        guideUrl: guide_url,
      };

      const result = await this.productService.createProduct(productDto);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Successfully Created', product: result });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Something went wrong !');
    }
  }
}
