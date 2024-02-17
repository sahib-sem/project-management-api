import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../auth/user.role';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: Role.Admin;

  @Prop({ required: true })
  contant_info: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
