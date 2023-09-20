import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { QUALITY_CONTROL_REPOSITORY } from 'src/core/constants';
import { QaulityControl } from './quality-control.entity';
import { QaulityControlDto } from './dto/quality-control.dto';

@Injectable()
export class QualityControlService {
  constructor(
    @Inject(QUALITY_CONTROL_REPOSITORY)
    private readonly qualityControlRepository: typeof QaulityControl,
  ) {}

  async createQualityControl(
    qualityControlDto: QaulityControlDto,
  ): Promise<QaulityControl> {
    return await this.qualityControlRepository.create(qualityControlDto);
  }

  updateQaulityControl(
    id: number,
    measured_value_1: number,
    measured_value_2: number,
    measured_value_3: number,
  ): Promise<QaulityControl | null> {
    return new Promise<QaulityControl | null>((resolve, reject) => {
      this.qualityControlRepository
        .update(
          {
            measured_value_1: measured_value_1,
            measured_value_2: measured_value_2,
            measured_value_3: measured_value_3,
          },
          { where: { id }, returning: true },
        )
        .then(([updatedRowCount, [updatedQaulityControl]]) => {
          if (updatedRowCount > 0) {
            resolve(updatedQaulityControl as QaulityControl);
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async findByFormIdAndWorkId(formId: number, workId: number) {
    const qualityControl = await this.qualityControlRepository.findAll({
      where: { form_id: formId, work_id: workId },
    });

    if (qualityControl.length === 0) {
      throw new NotFoundException('QualityControl is not found !');
    }

    return qualityControl;
  }
}
