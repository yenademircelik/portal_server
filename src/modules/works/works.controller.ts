import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { WorksService } from './works.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { WorkDto } from './dto/work.dto';

@UseGuards(JwtGuard)
@Controller('works')
export class WorksController {
  constructor(private readonly workService: WorksService) {}

  @Get('all')
  async getWorks() {
    const works = await this.workService.getWorks();
    if (!works) {
      return new NotFoundException('Works Not found !');
    }

    return { works };
  }

  @Post()
  async createWork(@Body() work: WorkDto) {
    const works = await this.workService.postWorks(work);
    return { works };
  }

  @Get(':id')
  async getWorkById(@Param('id') id: number) {
    const work = await this.workService.findOneById(id);
    if (!work) {
      return new NotFoundException('Work is not found !');
    }
    return work;
  }

  @Delete(':id')
  async deleteWorkById(@Param('id') id: number) {
    const deletedWork = await this.workService.deleteWork(id);
    if (deletedWork) {
      return new NotFoundException('Work is not found !');
    }

    return { message: 'Successfully Deleted !', deletedWork };
  }

  @Put(':id')
  async updateWork(@Param('id') id: number, @Body() work: WorkDto) {
    const updatedWork = await this.workService.updateWork(id, work);
    if (!updatedWork) {
      return new NotFoundException('Work is not found !');
    }

    return { message: 'Successfully updated', updatedWork: updatedWork };
  }
}
