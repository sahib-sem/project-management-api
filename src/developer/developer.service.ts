/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Developer } from './schema/developer.schema';
import { Model, Types } from 'mongoose';
import { RegisterDto } from 'src/auth/Dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectModel(Developer.name) private developerModel: Model<Developer>,
  ) {}

  async createDeveloper(registerDto: RegisterDto): Promise<Types.ObjectId> {
    const { password, ...rest } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const developer = new this.developerModel({
        ...rest,
        password: hashedPassword,
      });
      const created_developer = await developer.save();
      const { password, ...developer_final } = created_developer.toObject();
      return developer_final._id;
    } catch (err) {
      throw new InternalServerErrorException(
        'unexpected error occured while trying to create developer document',
      );
    }
  }
}
