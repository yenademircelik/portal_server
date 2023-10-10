import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { VendorService } from './vendor.service';
import { VendorDto } from './dto/vendor.dto';

@Controller('api/vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}
  @UseGuards(JwtGuard)
  @Get()
  async getVendors() {
    const vendors = await this.vendorService.getAllVendors();
    if (!vendors) {
      throw new NotFoundException('vendors not found!');
    }
    return { vendors };
  }
  @UseGuards(JwtGuard)
  @Post()
  async createVendors(@Body() vendor: VendorDto) {
    const vendors = await this.vendorService.createVendor(vendor);
    try {
      return vendors;
    } catch (error) {
      throw new HttpException(
        'Bad Request at Creating Vendor',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @UseGuards(JwtGuard)
  @Get('search')
  async getVendorsByName(@Query('name') name: string) {
    const vendor = await this.vendorService.getVendorsByName(name);
    try {
      return vendor;
    } catch (error) {
      throw new HttpException(
        'Bad Request at Finding Vendor',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
