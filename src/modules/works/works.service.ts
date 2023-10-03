import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { WORK_REPOSITORY } from '../../core/constants';
import { Work } from './works.entity';
import { WorkDto } from './dto/work.dto';

@Injectable()
export class WorksService {
  constructor(
    @Inject(WORK_REPOSITORY) private readonly workRepository: typeof Work,
  ) {}

  async getWorks() {
    const works = await this.workRepository.findAll();
    return works;
  }

  async postWorks(work: WorkDto): Promise<Work> {
    return await this.workRepository.create(work);
  }

  async deleteWork(id: number): Promise<Work> {
    const deletedWork = await this.workRepository.destroy({ where: { id } });

    if (deletedWork) {
      Promise.resolve(deletedWork);
    } else {
      return Promise.reject(new Error(`Work with id ${id} not found`));
    }
  }

  async findOneById(id: number): Promise<Work> {
    return this.workRepository.findOne<Work>({ where: { id } });
  }

  updateWork(id: number, work: WorkDto): Promise<Work | null> {
    return new Promise<Work | null>((resolve, reject) => {
      this.workRepository
        .update(work, { where: { id }, returning: true })
        .then(([updatedRowCount, [updatedWork]]) => {
          if (updatedRowCount > 0) {
            resolve(updatedWork as Work);
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
