import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WorksModule } from './modules/works/works.module';
import { InspectionPlanModule } from './modules/inspectionplan/inspectionplan.module';
import { CustomerModule } from './modules/customer/customer.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { LocationModule } from './modules/location/location.module';
import { DescriptionControlModule } from './modules/description_control/description_control.module';
import { WorkStepsModule } from './modules/work-steps/work-steps.module';
import { WorkProductsModule } from './modules/work-products/work-products.module';
import { ProductsModule } from './modules/products/products.module';
import { CertificateModule } from './modules/certificate/certificate.module';
import { QualityControlModule } from './modules/quality-control/quality-control.module';
import { ImagesModule } from './modules/images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    WorksModule,
    InspectionPlanModule,
    CustomerModule,
    VendorModule,
    LocationModule,
    DescriptionControlModule,
    WorkStepsModule,
    WorkProductsModule,
    ProductsModule,
    CertificateModule,
    QualityControlModule,
    ImagesModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
