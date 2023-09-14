import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WorksModule } from './modules/works/works.module';
import { WorkStepsModule } from './modules/work-steps/work-steps.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    WorksModule,
    WorkStepsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
