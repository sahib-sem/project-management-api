/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './schema/client.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from 'src/auth/Dto/register.dto';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  async createClient(registerDto: RegisterDto): Promise<Types.ObjectId> {
    const { email, password, ...rest } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const client = new this.clientModel({
        ...rest,
        password: hashedPassword,
      });
      const created_client = await client.save();
      const { password, ...client_final } = created_client.toObject();
      return client_final._id;
    } catch (err) {
      throw new InternalServerErrorException(
        'unexpected error occured while trying to create client document',
      );
    }
  }
}
