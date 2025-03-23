import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/schemas/order.schema';
import { CreateOrderDto, UpdateOrderDto } from 'src/dtos/order.dto';
import {
  IHigherOrder,
  ITotalSoldLastMonth,
} from 'src/interfaces/order.interface';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createOrder(@Body() order: CreateOrderDto): Promise<Order> {
    return await this.orderService.createOrder(order);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() order: UpdateOrderDto,
  ): Promise<Order> {
    return await this.orderService.updateOrder(id, order);
  }

  @UseGuards(AuthGuard)
  @Get('sold')
  async getTotalSoldLastMonth(): Promise<ITotalSoldLastMonth> {
    return await this.orderService.getTotalSoldLastMonth();
  }

  @UseGuards(AuthGuard)
  @Get('higher')
  async getHigherOrder(): Promise<IHigherOrder> {
    return await this.orderService.getHigherOrder();
  }
}
