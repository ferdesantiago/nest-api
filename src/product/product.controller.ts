import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/schemas/product.schema';
import { CreateProductDto } from 'src/dtos/product.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  @FormDataRequest()
  async createUser(@Body() product: CreateProductDto): Promise<Product> {
    const result = await this.productService.createProduct(product);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get(':sku')
  async getProduct(@Param('sku') sku: string): Promise<Product> {
    const result = await this.productService.getProduct(sku);
    return result;
  }
}
