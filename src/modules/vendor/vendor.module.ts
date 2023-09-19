import { Module } from "@nestjs/common";
import { VendorService } from "./vendor.service";
import { vendorProviders } from "./vendor.providers";
import { VendorController } from "./vendor.controller";


@Module({
    providers:[VendorService,...vendorProviders],
    exports:[VendorService],
    controllers:[VendorController],

})
export class VendorModule{}