import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { ProductDto } from 'src/modules/products/dto/product.dto';
import { ImageDto } from 'src/modules/images/dto/image.dto';
import { QaulityControlDto } from 'src/modules/quality-control/dto/quality-control.dto';
import FormData from 'form-data';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3000);
    pactum.request.setBaseUrl('http://localhost:3000');
  });

  describe('products', () => {
    describe('getProducts', () => {
      it('test get products', () => {
        return pactum.spec().get('/products').inspect();
      });
    });
    describe('getProductsByName', () => {
      it('test get products by name', () => {
        return pactum
          .spec()
          .get('/products/:productName')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withQueryParams('name', 'denemeProduct');
      });
    });
    describe('getProductsByOdooId', () => {
      it('test get products by odooid', () => {
        return pactum
          .spec()
          .get('http://localhost:3000/products/:odooId')
          .withQueryParams('odooId', 1);
      });
    });
    describe('postProducts', () => {
      it('test post products', () => {
        const dto: ProductDto = {
          name: 'testProduct',
          odooId: 1,
          customer: 'testCustomer',
          customerId: 1,
          technicalDrawingUrl: 'testingurl',
          guideUrl: 'testingguideurl',
        };
        return pactum
          .spec()
          .post('/products')
          .withMultiPartFormData(dto)
          .inspect();
      });
    });
  });

  describe('images', () => {
    describe('getImage', () => {
      it('testing get images', () => {
        return pactum
          .spec()
          .get('http://localhost:3000/images/:qualityControlId')
          .withQueryParams('qualityControlId', 1)
          .inspect();
      });
    });
    describe('postImage', () => {
      it('testing post image', () => {
        const dto: ImageDto = {
          image_url: 'deneme_url',
          quality_control_id: 1,
          status: 'deneme',
          work_id: 1,
        };
        return pactum.spec().post('/images').withBody(dto).inspect();
      });
    });
    describe('putImage', () => {
      it('testing put image', () => {
        const newStatus = 'newStatus';
        const dto: ImageDto = {
          image_url: 'deneme_url',
          quality_control_id: 1,
          status: newStatus,
          work_id: 1,
        };
        return pactum
          .spec()
          .put('http://localhost:3000/images/:id')
          .withQueryParams('id', 1)
          .withBody(dto)
          .inspect();
      });
    });
  });
  describe('qualityControl', () => {
    it('testing post qualityControl', () => {
      const dto: QaulityControlDto = {
        form_id: 1,
        step_name: 'deneme',
        name: 'deneme',
        technical_drawing_numbering: 'deneme',
        tools: 'deneme',
        description: 'deneme',
        actual_dimension: 'deneme',
        lower_tolerance: 'deneme',
        upper_tolerance: 'deneme',
        example_visual_url: 'deneme',
        status: 'deneme',
        type: 'deneme',
        image_id: 1,
        substep_id: 1,
        measured_value_1: 1,
        measured_value_2: 2,
        measured_value_3: 3,
        work_id: 1,
        sample_quantity: 1,
        row_number: 'deneme',
      };
      return pactum.spec().post('/qualityControl').withBody(dto).inspect();
    });
    describe('getQualityControl', () => {
      it('testing get quality control', () => {
        return pactum
          .spec()
          .get('http://localhost:3000/form/:formId/:workId')
          .withQueryParams('formId', 1)
          .withQueryParams('workId', 1)
          .inspect();
      });
    });
    describe('putQualityControl', () => {
      it('testing update quality control', () => {
        const dto: QaulityControlDto = {
          form_id: 1,
          step_name: 'deneme',
          name: 'deneme',
          technical_drawing_numbering: 'deneme',
          tools: 'deneme',
          description: 'deneme',
          actual_dimension: 'deneme',
          lower_tolerance: 'deneme',
          upper_tolerance: 'deneme',
          example_visual_url: 'deneme',
          status: 'deneme',
          type: 'deneme',
          image_id: 1,
          substep_id: 1,
          measured_value_1: 3,
          measured_value_2: 2,
          measured_value_3: 1,
          work_id: 1,
          sample_quantity: 1,
          row_number: 'deneme',
        };
        return pactum
          .spec()
          .put('http://localhost:3000/qualityControl/:id')
          .withQueryParams('id', 1)
          .withBody(dto)
          .inspect();
      });
    });
  });
});
