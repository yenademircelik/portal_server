import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WORKPRODUCTS_REPOSITORY } from '../../core/constants';
import { WorkProducts } from './work-products.entity';
import { WorkProductDto } from './dto/work-products.dto';

@Injectable()
export class WorkProductsService {
  constructor(
    @Inject(WORKPRODUCTS_REPOSITORY)
    private readonly workProductRepository: typeof WorkProducts,
  ) {}

  async createWorkProduct(workProduct: WorkProductDto): Promise<WorkProducts> {
    return await this.workProductRepository.create(workProduct);
  }

  async getWorkProducts(work_id: number) {
    const workProduct = await this.workProductRepository.findAll({
      where: { work_id: work_id },
    });

    if (workProduct.length === 0) {
      return new NotFoundException(
        `Work Product not found with ${work_id} work_id !`,
      );
    }
    return { message: 'Successfully fetched work products !', workProduct };
  }
}
