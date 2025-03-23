import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(name: string): Promise<User | null> {
    return this.userModel.findOne({ name });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    user.password = await bcrypt.hash(user.password, 1);
    const newUser = new this.userModel({
      ...user,
    });
    return newUser.save();
  }
}
