import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WorkDto {
  @IsNotEmpty()
  @IsString()
  readonly order_number: string;
  @IsNotEmpty()
  @IsString()
  readonly project_number: string;
  @IsNumber()
  @IsNotEmpty()
  readonly vendor_id: number;
  @IsNumber()
  @IsNotEmpty()
  readonly customer_id: number;
  @IsNumber()
  @IsNotEmpty()
  readonly quality_responsible_id: number;
  @IsNumber()
  @IsNotEmpty()
  readonly inspector_id: number;
  @IsNumber()
  @IsNotEmpty()
  readonly foreman_id: number;
  @IsNotEmpty()
  @IsString()
  readonly work_type: string;
  @IsNotEmpty()
  @IsString()
  readonly state: string;
  @IsNotEmpty()
  @IsString()
  readonly status: string;
  @IsNotEmpty()
  @IsString()
  readonly creator_name: string;
  @IsNotEmpty()
  @IsNumber()
  readonly order_id: number;
}
