/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RegisterDto } from 'src/auth/Dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from 'src/auth/Dto/update_user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findOne(username: string) {
    const user = await this.userModel.findOne({ username });

    return user;
  }

  async createUser(registerDto: RegisterDto): Promise<Types.ObjectId> {
    const { password, email, ...rest } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = new this.userModel({ ...rest, password: hashedPassword });
      const created_user = await user.save();
      const { password, ...user_final } = created_user.toObject();
      return user_final._id;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('unexpected error occured');
    }
  }

  async updateuser(userId: string, updateuser: UpdateUserDto) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.keys(updateuser).forEach((key) => {
      if (key in user) {
        user[key] = updateuser[key];
      }
    });

    await user.save();
  }
}
