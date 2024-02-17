/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Admin } from './schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RegisterDto } from 'src/auth/Dto/register.dto';
import * as bcrypt from 'bcryptjs';

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
      throw new InternalServerErrorException('unexpected error occured');
    }
  }

  async updateAdmin() {}
}
