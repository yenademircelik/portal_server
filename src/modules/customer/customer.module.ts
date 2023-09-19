import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { customerProviders } from "./customer.providers";
import { CustomerController } from "./customer.controller";


@Module({
    providers:[CustomerService,...customerProviders],
    exports:[CustomerService],
    controllers:[CustomerController]
})

export class CustomerModule{}