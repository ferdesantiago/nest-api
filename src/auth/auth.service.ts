import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userService.findOne(name);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const userLookUp = await this.validateUser(user.name, user.password);
    if (!userLookUp) {
      throw new UnauthorizedException();
    }
    const payload = { name: userLookUp.name, sub: userLookUp.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
