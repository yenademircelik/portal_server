import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WorksModule } from './modules/works/works.module';
import { InspectionPlan } from './modules/inspectionplan/inspectionplan.entity';
import { InspectionPlanModule } from './modules/inspectionplan/inspectionplan.module';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    WorksModule,
    InspectionPlanModule,
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
