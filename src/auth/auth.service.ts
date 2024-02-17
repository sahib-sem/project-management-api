/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admin/schemas/admin.schema';
import { RegisterDto } from './Dto/register.dto';
import { Types } from 'mongoose';
import { Role } from 'src/auth/user.role';
import { ClientService } from 'src/client/client.service';
import { DeveloperService } from 'src/developer/developer.service';
import { UpdateUserDto } from './Dto/update_user.dto';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private clientService: ClientService,
    private developerService: DeveloperService,
  ) {}

  async validateAdmin(username: string, password: string): Promise<any> {
    const admin_mongo = await this.adminService.findOne(username);
    if (!admin_mongo) {
      throw new UnauthorizedException();
    }
    const admin = admin_mongo.toObject();
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const { password, ...result } = admin;

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

    if (role == Role.Admin) {
      return await this.adminService.createAdmin(registerDto);
    } else if (role == Role.Client) {
      return await this.clientService.createClient(registerDto);
    } else if (role == Role.Developer) {
      return await this.developerService.createDeveloper(registerDto);
    }

    return null;
  }
}
