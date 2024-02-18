/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './Dto/register.dto';
import { Types } from 'mongoose';
import { Role } from 'src/auth/user.role';
import { UpdateUserDto } from './Dto/update_user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateuser(username: string, password: string): Promise<any> {
    const user_mongo = await this.userService.findOne(username);
    if (!user_mongo) {
      throw new UnauthorizedException();
    }
    const user = user_mongo.toObject();
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<Types.ObjectId | null> {
    const role = registerDto.role;

    const user = await this.userService.createUser(registerDto);

    return user._id;
  }
}
