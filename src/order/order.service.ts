import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrderDto, UpdateOrderDto } from 'src/dtos/order.dto';
import { CustomException } from 'src/exceptions/error.exception';
import {
  IHigherOrder,
  ITotalSoldLastMonth,
  IVerifyProducts,
} from 'src/interfaces/order.interface';
import { Order } from 'src/schemas/order.schema';
import { Product } from 'src/schemas/product.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findOne(name: string): Promise<Order | null> {
    return this.orderModel.findOne({ name });
  }

  async verifyProducts(productIds: string[]): Promise<IVerifyProducts> {
    const ids = productIds.map((id) => new Types.ObjectId(id));
    const products = await this.productModel.find({ _id: { $in: ids } });
    if (products.length !== productIds.length) {
      throw new CustomException(
        HttpStatus.NOT_FOUND,
        'One or more products not found',
      );
    }
    const total = products.reduce((acc, product) => acc + product.price, 0);
    return { productIds, total };
  }

  async createOrder(order: CreateOrderDto): Promise<Order> {
    const { total } = await this.verifyProducts(order.productIds);
    const newOrder = new this.orderModel({
      ...order,
      total,
    });
    return newOrder.save();
  }

  async updateOrder(id: string, order: UpdateOrderDto): Promise<Order> {
    const { productIds, total } = await this.verifyProducts(order.productIds);
    const updatedUser = await this.orderModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { productIds, total },
      { new: true },
    );
    return updatedUser;
  }

  async getTotalSoldLastMonth(): Promise<ITotalSoldLastMonth> {
    const lastMonth = new Date();
    if (lastMonth.getMonth() === 0) {
      lastMonth.setMonth(12);
    }
    const result = await this.orderModel
      .aggregate([
        {
          $match: {
            $expr: { $eq: [{ $month: '$created' }, lastMonth.getMonth()] },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$total' },
          },
        },
      ])
      .then((result) => result[0]?.total || 0);

    return {
      total: result,
    };
  }

  async getHigherOrder(): Promise<IHigherOrder> {
    const result = await this.orderModel
      .aggregate([
        {
          $group: {
            _id: '$_id',
            productCount: { $sum: 1 },
          },
        },
        {
          $sort: { productCount: -1 },
        },
        {
          $limit: 1,
        },
      ])
      .then((result) => result[0]?._id || 0);

    return {
      id: result,
    };
  }
}
