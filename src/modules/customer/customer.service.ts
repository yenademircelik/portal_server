import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from '../../core/constants';
import { Customer } from './customer.entity';
import { CustomerDto } from './dto/customer.dto';
import { Op } from 'sequelize';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: typeof Customer,
  ) {}

  async createCustomer(customer: CustomerDto): Promise<Customer> {
    return await this.customerRepository.create(customer);
  }

  async getCustomers(): Promise<Customer[]> {
    return await this.customerRepository.findAll();
  }

  async getCustomersByName(name: string): Promise<Customer[]> {
    return await this.customerRepository.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
  }
}
