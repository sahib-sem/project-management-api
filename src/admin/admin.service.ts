/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Admin } from './schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RegisterDto } from 'src/auth/Dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from 'src/auth/Dto/update_user.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}
  async findOne(username: string) {
    const user = await this.adminModel.findOne({ username });

    return user;
  }

  async createAdmin(registerDto: RegisterDto): Promise<Types.ObjectId> {
    const { password, email, ...rest } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const admin = new this.adminModel({ ...rest, password: hashedPassword });
      const created_admin = await admin.save();
      const { password, ...admin_final } = created_admin.toObject();
      return admin_final._id;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('unexpected error occured');
    }
  }

  async updateAdmin(userId: string, updateAdmin: UpdateUserDto) {
    const admin = await this.adminModel.findById(userId);

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    Object.keys(updateAdmin).forEach((key) => {
      if (key in admin) {
        admin[key] = updateAdmin[key];
      }
    });

    await admin.save();
  }
}
