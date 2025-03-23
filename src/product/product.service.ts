import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findOne(sku: string): Promise<Product | null> {
    return this.productModel.findOne({ sku });
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel({
      ...product,
    });
    return newProduct.save();
  }

  async getProduct(sku: string): Promise<Product | null> {
    return this.productModel.findOne({ sku });
  }
}
