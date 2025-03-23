import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  productIds: Types.ObjectId[];

  @Prop({ default: Date.now })
  created: Date;

  @Prop({ default: Date.now, update: Date.now })
  updated: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
