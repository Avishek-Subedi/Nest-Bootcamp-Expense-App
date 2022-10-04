import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class updateReportDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}
