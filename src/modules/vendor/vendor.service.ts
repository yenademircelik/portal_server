import { Inject, Injectable } from '@nestjs/common';
import { VENDOR_REPOSITORY } from '../../core/constants';
import { Vendor } from './vendor.entity';
import { VendorDto } from './dto/vendor.dto';
import { Op } from 'sequelize';

@Injectable()
export class VendorService {
  constructor(
    @Inject(VENDOR_REPOSITORY) private readonly vendorRepository: typeof Vendor,
  ) {}

  async createVendor(vendor: VendorDto): Promise<Vendor> {
    return await this.vendorRepository.create(vendor);
  }

  async getAllVendors(): Promise<Vendor[]> {
    return await this.vendorRepository.findAll();
  }

  async getVendorsByName(name: string): Promise<Vendor[]> {
    return await this.vendorRepository.findAll({
      where: {
        name,
      },
    });
  }
}
