import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  created: Date;

  @Prop({ default: Date.now, update: Date.now })
  updated: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
