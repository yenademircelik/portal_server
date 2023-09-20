import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DescriptionControlDto {
  @IsNumber()
  @IsNotEmpty()
  inspectionplan_id: number;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  documents: string;
  @IsNumber()
  @IsNotEmpty()
  creator_id: number;
  @IsNotEmpty()
  creation_date: Date;
}
