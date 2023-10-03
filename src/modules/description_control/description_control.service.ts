import { Inject, Injectable } from '@nestjs/common';
import { DESCRIPTIONCONTROL_REPOSITORY } from '../../core/constants';
import { DescriptionControl } from './description_control.entity';
import { DescriptionControlDto } from './dto/description_control.dto';

@Injectable()
export class DescriptionControlService {
  constructor(
    @Inject(DESCRIPTIONCONTROL_REPOSITORY)
    private readonly descriptionControlRepository: typeof DescriptionControl,
  ) {}

  async findAllDescriptionControl() {
    return await this.descriptionControlRepository.findAll();
  }
  async findByInspectionPlanId(
    inspectionplan_id: number,
  ): Promise<DescriptionControl> {
    return await this.descriptionControlRepository.findOne({
      where: { inspectionplan_id },
    });
  }

  //TODO: create ederken azure ile link haline getirilecek
  async createDescriptionControl(descriptionControl: DescriptionControlDto) {
    const result =
      await this.descriptionControlRepository.create(descriptionControl);
    return result;
  }
  async update(
    id: number,
    fieldsToUpdate: Record<string, any>,
  ): Promise<DescriptionControl[] | null> {
    const updateResult = await this.descriptionControlRepository.update(
      fieldsToUpdate,
      {
        where: { id },
      },
    );

    if (updateResult[0] === 0) {
      // Eğer hiçbir kayıt güncellenmediyse
      return null;
    }

    return this.descriptionControlRepository.findAll({
      where: { id },
    });
  }
}
