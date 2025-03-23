import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  productIds: string[];
}

export class UpdateOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  productIds: string[];
}
