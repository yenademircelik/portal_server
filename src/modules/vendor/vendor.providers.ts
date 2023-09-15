import { VENDOR_REPOSITORY } from "src/core/constants";
import { Vendor } from "./vendor.entity";


export const vendorProviders=[
    {
        provide:VENDOR_REPOSITORY,
        useValue:Vendor,
    }
]