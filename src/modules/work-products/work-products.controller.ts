import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WorkProductsService } from './work-products.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { WorkProductDto } from './dto/work-products.dto';

@UseGuards(JwtGuard)
@Controller('workProducts')
export class WorkProductsController {
  constructor(private readonly workProductService: WorkProductsService) {}

  @Get(':work_id')
  async getWorkProductsByWorkId(@Param('work_id') work_id: number) {
    try {
      const workProducts =
        await this.workProductService.getWorkProducts(work_id);

      return {
        workProducts: workProducts,
      };
    } catch (error) {
      throw new BadRequestException(error, 'Something went wrong !');
    }
  }

  @Post()
  async createWorkProduct(@Body() workProduct: WorkProductDto) {
    try {
      const newWorkProduct =
        await this.workProductService.createWorkProduct(workProduct);

      return {
        message: 'Successfully created new workProduct !',
        newWorkProduct: newWorkProduct,
      };
    } catch (error) {
      throw new BadRequestException(error, 'Something went wrong !');
    }
  }
}
