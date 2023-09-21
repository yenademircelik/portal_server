import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QaulityControlDto {
  @IsNotEmpty()
  @IsString()
  readonly technical_drawing_numbering: string;
  @IsString()
  @IsNotEmpty()
  readonly tools: string;
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  @IsString()
  readonly actual_dimension: string;
  @IsNotEmpty()
  @IsString()
  readonly lower_tolerance: string;
  @IsNotEmpty()
  @IsString()
  readonly upper_tolerance: string;
  @IsNotEmpty()
  @IsString()
  readonly example_visual_url: string;
  @IsNotEmpty()
  @IsString()
  readonly status: string;
  @IsNotEmpty()
  @IsString()
  readonly type: string;
  @IsNotEmpty()
  @IsString()
  readonly step_name: string;
  @IsNotEmpty()
  @IsNumber()
  readonly form_id: number;
  @IsNotEmpty()
  @IsNumber()
  readonly measured_value_1: number;
  @IsNotEmpty()
  @IsNumber()
  readonly measured_value_2: number;
  @IsNotEmpty()
  @IsNumber()
  readonly measured_value_3: number;
  @IsNotEmpty()
  @IsNumber()
  readonly image_id: number;
  @IsNotEmpty()
  @IsNumber()
  readonly substep_id: number;
  @IsNotEmpty()
  @IsNumber()
  readonly work_id: number;
  @IsNotEmpty()
  @IsNumber()
  readonly sample_quantity: number;
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly row_number: string;
}
