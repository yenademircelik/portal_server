import { Module } from '@nestjs/common';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';
import { worksProvider } from './works.providers';

@Module({
  providers: [WorksService, ...worksProvider],
  exports: [WorksService],
  controllers: [WorksController],
})
export class WorksModule {}
