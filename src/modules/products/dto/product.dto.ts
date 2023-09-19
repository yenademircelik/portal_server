import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  readonly odooId: number;
  @IsNotEmpty()
  @IsString()
  readonly customer: string;
  @IsNotEmpty()
  readonly customerId: number;
  @IsNotEmpty()
  technicalDrawingUrl: any;
  @IsNotEmpty()
  guideUrl: any;
}
