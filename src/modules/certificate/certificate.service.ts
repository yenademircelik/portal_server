import { Inject, Injectable } from '@nestjs/common';
import { CERTIFICATE_REPOSITORY } from '../../core/constants';
import { Certificate } from './certificate.entity';
import { CertificateDto } from './dto/certificate.dto';

@Injectable()
export class CertificateService {
  constructor(
    @Inject(CERTIFICATE_REPOSITORY)
    private readonly certificateRepository: typeof Certificate,
  ) {}

  async findAllCertificate() {
    return await this.certificateRepository.findAll();
  }
  async findByIdCertificate(id: number): Promise<Certificate> {
    return await this.certificateRepository.findOne({ where: { id } });
  }

  //TODO: create ederken azure ile link haline getirilecek
  async createCertificate(certificate: CertificateDto) {
    const result = await this.certificateRepository.create(certificate);
    return result;
  }
  async update(
    id: number,
    fieldsToUpdate: Record<string, any>,
  ): Promise<Certificate[] | null> {
    const updateResult = await this.certificateRepository.update(
      fieldsToUpdate,
      {
        where: { id },
      },
    );

    if (updateResult[0] === 0) {
      // Eğer hiçbir kayıt güncellenmediyse
      return null;
    }

    return this.certificateRepository.findAll({
      where: { id },
    });
  }
  async delete(id: number): Promise<Certificate> {
    const deleteCertificate = await this.certificateRepository.destroy({
      where: { id },
    });
    if (deleteCertificate) {
      Promise.resolve(deleteCertificate);
    } else {
      return Promise.reject(Error);
    }
  }
}
