import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IMAGES_REPOSITORY } from '../../core/constants';
import { Images } from './images.entity';
import { ImageDto } from './dto/image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @Inject(IMAGES_REPOSITORY) private readonly imagesRepository: typeof Images,
  ) {}

  async createImage(imageDto: ImageDto): Promise<Images> {
    return await this.imagesRepository.create(imageDto);
  }

  async getImageByQaulityControlId(qualityControlId: number) {
    const image = await this.imagesRepository.findAll({
      where: { quality_control_id: qualityControlId },
    });

    if (image.length === 0) {
      throw new NotFoundException('Image is not found !');
    }
    return image;
  }

  async updateImageStatus(status: string, imageId: number) {
    const [updatedRows, updatedStatus] = await this.imagesRepository.update(
      { status: status },
      { where: { id: imageId }, returning: true },
    );

    if (updatedRows === 0) {
      throw new BadRequestException('Something went wrong !');
    }

    return updatedStatus;
  }
}
