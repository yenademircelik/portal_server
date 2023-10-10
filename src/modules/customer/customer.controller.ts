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
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';

@Controller('api/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @UseGuards(JwtGuard)
  @Get()
  async getCustomers() {
    const customers = await this.customerService.getCustomers();
    if (!customers) {
      throw new NotFoundException('Customers not found!');
    }
    return { customers };
  }
  @UseGuards(JwtGuard)
  @Post()
  async createCustomer(@Body() customer: CustomerDto) {
    const customers = await this.customerService.createCustomer(customer);
    try {
      return customers;
    } catch (error) {
      throw new HttpException(
        'Bad Request at Creating Customer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @UseGuards(JwtGuard)
  @Get('search')
  async getCustomerByName(@Query('name') name: string) {
    const customer = await this.customerService.getCustomersByName(name);
    try {
      return customer;
    } catch (error) {
      throw new HttpException(
        'Bad Request at Finding Customer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
