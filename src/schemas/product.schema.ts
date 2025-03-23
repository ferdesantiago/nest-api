import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MemoryStoredFile } from 'nestjs-form-data';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  sku: string;

  @Prop({ required: true })
  picture: MemoryStoredFile;

  @Prop({ required: true })
  price: number;

  @Prop({ default: Date.now })
  created: Date;

  @Prop({ default: Date.now, update: Date.now })
  updated: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
