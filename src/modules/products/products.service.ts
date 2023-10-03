import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PRODUCTS_REPOSITORY } from '../../core/constants';
import { Products } from './products.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productsRepository: typeof Products,
  ) {}

  async getProducts() {
    return await this.productsRepository.findAll();
  }

  async getProductByName(name: string) {
    const product = await this.productsRepository.findAll<Products>({
      where: { name },
    });

    if (product.length === 0) {
      throw new NotFoundException('Product is not found !');
    }

    return product;
  }

  async getProductByOdooId(odooId: number) {
    const product = await this.productsRepository.findAll({
      where: { odooId },
    });

    if (product.length === 0) {
      throw new NotFoundException('Product is not found !');
    }

    return product;
  }

  async createProduct(productDto: ProductDto) {
    const result = await this.productsRepository.create(productDto);
    return result;
  }
}
