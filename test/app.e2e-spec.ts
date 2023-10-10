import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { ProductDto } from 'src/modules/products/dto/product.dto';
import { ImageDto } from 'src/modules/images/dto/image.dto';
import { QaulityControlDto } from 'src/modules/quality-control/dto/quality-control.dto';
import FormData from 'form-data';
import { AuthDto } from 'src/modules/auth/dto/auth.dto';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { CustomerDto } from 'src/modules/customer/dto/customer.dto';

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
        return pactum
          .spec()
          .get('/products')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect();
      });
    });
    describe('getProductsByName', () => {
      it('test get products by name', () => {
        return pactum
          .spec()
          .get('/products/productName')
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
          .get('/products/{odooId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withPathParams('odooId', 1);
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
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect();
      });
    });
  });

  describe('images', () => {
    describe('getImage', () => {
      it('testing get images', () => {
        return pactum
          .spec()
          .get('/images/{qualityControlId}')
          .withPathParams('qualityControlId', 1)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
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
        return pactum
          .spec()
          .post('/images')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect();
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
          .put('/images/{id}')
          .withPathParams('id', 1)
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect();
      });
    });
  });
  describe('qualityControl', () => {
    describe('postQualityControl', () => {
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
        return pactum
          .spec()
          .post('/qualityControl')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect();
      });
    });

    describe('getQualityControl', () => {
      it('testing get quality control', () => {
        return pactum
          .spec()
          .get('/form/{formId}/{workId}')
          .withPathParams('formId', 1)
          .withPathParams('workId', 1)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
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
          .put('/qualityControl/{id}')
          .withPathParams('id', 1)
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect();
      });
    });
  });
  describe('Auth', () => {
    describe('register', () => {
      it('testing auth register', () => {
        const dto: UserDto = {
          name: 'burak',
          phone: '654654',
          email: 'bba@gmail.com',
          password: '1',
          company: 'yena',
          related_company: 'deneme',
          role: 'INTERNAL',
        };
        return pactum.spec().post('/auth/register').withBody(dto).inspect();
      });
    });
    describe('login', () => {
      it('testing auth login', () => {
        const dto: AuthDto = {
          email: 'bba@gmail.com',
          password: '1',
        };
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .stores('userAt', 'access_token')
          .inspect();
      });
    });
  });
  describe('users', () => {
    describe('createUser', () => {
      it('create user testing', () => {
        const dto: UserDto = {
          name: 'burak2',
          phone: '456456',
          email: 'bba2@gmail.com',
          password: '1',
          company: 'yena',
          related_company: 'deneme2',
          role: 'EXTERNAL',
        };
        return pactum
          .spec()
          .post('/api/create_user')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect();
      });
    });
    describe('allUsers', () => {
      it('get all users testing', () => {
        return pactum
          .spec()
          .get('/api/allusers')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect();
      });
    });
    describe('find user by id', () => {
      it('get users by id', () => {
        return pactum
          .spec()
          .get('/api/users/{id}')
          .withPathParams('id', 1)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
  });
  describe('Customers', () => {
    describe('createCustomer', () => {
      it('post create customer testing', () => {
        const dto: CustomerDto = {
          name: 'testCustomer',
          odooid: 1,
        };
        return pactum
          .spec()
          .post('/api/customers')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect();
      });
    });
    describe('getCustomers', () => {
      it('get customers testing', () => {
        return pactum
          .spec()
          .get('/api/customers')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
    describe('getCustomer by name', () => {
      it('get customer by name with queryParams', () => {
        return pactum
          .spec()
          .get('/api/customers/search')
          .withQueryParams('name', 'testCustomer')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect();
      });
    });
  });
});
