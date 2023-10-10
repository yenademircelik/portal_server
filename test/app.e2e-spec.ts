import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { ProductDto } from 'src/modules/products/dto/product.dto';
import { ImageDto } from 'src/modules/images/dto/image.dto';
import { QaulityControlDto } from 'src/modules/quality-control/dto/quality-control.dto';
import { AuthDto } from 'src/modules/auth/dto/auth.dto';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { CustomerDto } from 'src/modules/customer/dto/customer.dto';
import { VendorDto } from 'src/modules/vendor/dto/vendor.dto';
import { WorkDto } from 'src/modules/works/dto/work.dto';
import { WorkStepsDto } from 'src/modules/work-steps/dto/work-steps.dto';
import { WorkProductDto } from 'src/modules/work-products/dto/work-products.dto';
import { LocationDto } from 'src/modules/location/dto/location.dto';

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

  afterAll(async () => {
    await app.close();
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
  describe('Vendors', () => {
    describe('CreateVendors', () => {
      it('create vendors testing', () => {
        const dto: VendorDto = {
          name: 'testVendor',
          odooid: 1,
        };
        return pactum
          .spec()
          .post('/api/vendors')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect();
      });
    });
    describe('getVendors', () => {
      it('get vendors testing', () => {
        return pactum
          .spec()
          .get('/api/vendors')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect();
      });
    });
    describe('getVendors by name', () => {
      it('get vendors by name testing', () => {
        return pactum
          .spec()
          .get('/api/vendors/search')
          .withQueryParams('name', 'testVendor')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
  });
  describe('Works', () => {
    describe('getAllWorks', () => {
      it('getAllWorks testing', () => {
        return pactum
          .spec()
          .get('/works/all')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
    describe('Post Work', () => {
      it('create work testing', () => {
        const dto: WorkDto = {
          order_number: '1',
          project_number: '2',
          vendor_id: 3,
          customer_id: 4,
          quality_responsible_id: 5,
          inspector_id: 6,
          foreman_id: 7,
          order_id: 8,
          work_type: 'testOrder',
          state: 'test',
          status: 'test',
          creator_name: 'bba',
        };
        return pactum
          .spec()
          .post('/works')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
    describe('getWorksById', () => {
      it('get works by id testing', () => {
        return pactum
          .spec()
          .get('/works/{id}')
          .withPathParams('id', 1)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
    describe('PutWorksById', () => {
      it('update works by id testing', () => {
        const updatedDto: WorkDto = {
          order_number: '8',
          project_number: '7',
          vendor_id: 6,
          customer_id: 5,
          quality_responsible_id: 4,
          inspector_id: 3,
          foreman_id: 2,
          order_id: 1,
          work_type: 'updatedTestOrder',
          state: 'updatedTest',
          status: 'updatedTest',
          creator_name: 'bba',
        };
        return pactum
          .spec()
          .put('/works/{id}')
          .withPathParams('id', 1)
          .withBody(updatedDto)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
    describe('deleteWorkById', () => {
      it('delete work by id testing', () => {
        return pactum
          .spec()
          .delete('/works/{id}')
          .withPathParams('id', 3)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
  });
  describe('workSteps', () => {
    describe('CreateWorkSteps', () => {
      it('create work steps testing', () => {
        const dto: WorkStepsDto = {
          work_id: 1,
          step_name: 'deneme2',
          state: 'deneme2',
          status: 'deneme2',
        };
        return pactum
          .spec()
          .post('/workSteps')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
    describe('GetWorkStepById', () => {
      it('Get work steps by id testing', () => {
        return pactum
          .spec()
          .get('/workSteps/{id}')
          .withPathParams('id', 1)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
    describe('GetWorkStepsByStatus', () => {
      it('get workSteps by status testing', () => {
        return pactum
          .spec()
          .get('/workSteps')
          .withQueryParams('status', 'deneme2')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
    describe('PutWorkStepsById', () => {
      it('update worksteps by id testing', () => {
        const updatedDto: WorkStepsDto = {
          work_id: 4,
          step_name: 'updatedDeneme2',
          state: 'updatedDeneme2',
          status: 'updatedDeneme2',
        };
        return pactum
          .spec()
          .put('/workSteps/{id}')
          .withBody(updatedDto)
          .withPathParams('id', 4)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
    describe('DeleteWorkStepsById', () => {
      it('delete worksteps by id testing', () => {
        return pactum
          .spec()
          .delete('/workSteps/{id}')
          .withPathParams('id', 5)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
  });
  describe('WorkProducts', () => {
    describe('PostWorkProducts', () => {
      it('create workProducts testing', () => {
        const dto: WorkProductDto = {
          work_id: 1,
          product_id: 1,
          status: 'deneme',
        };
        return pactum
          .spec()
          .post('/workProducts')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
    describe('GetWorkProductsById', () => {
      it('get work products by id', () => {
        return pactum
          .spec()
          .get('/workSteps/{work_id}')
          .withPathParams('work_id', 1)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
  });
  describe('location', () => {
    describe('PostLocation', () => {
      it('create location testing', () => {
        const dto: LocationDto = {
          name: 'testingLocation',
          atitude: 1,
          longitude: 1,
          timestamp: '10.10.23',
        };
        return pactum
          .spec()
          .post('/api/locations')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
    describe('GetAllLocations', () => {
      it('get all locations testing', () => {
        return pactum
          .spec()
          .get('/api/locations')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
    describe('getLatestLocation', () => {
      it('get latest location testing', () => {
        return pactum
          .spec()
          .get('/api/locations/latest')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .inspect();
      });
    });
  });
});
