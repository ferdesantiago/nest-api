import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';
import { IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsFile()
  picture: MemoryStoredFile;

  @IsNotEmpty()
  @IsNumberString()
  price: number;
}
