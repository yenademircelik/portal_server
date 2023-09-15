import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WorkProductDto {
  @IsNotEmpty()
  @IsNumber()
  readonly work_id: number;
  @IsNotEmpty()
  @IsNumber()
  readonly product_id: number;
  @IsNotEmpty()
  @IsString()
  readonly status: string;
}
