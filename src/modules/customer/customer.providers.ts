import { CUSTOMER_REPOSITORY } from "src/core/constants";
import { Customer } from "./customer.entity";


export const customerProviders=[
    {
        provide:CUSTOMER_REPOSITORY,
        useValue:Customer,
    }
]