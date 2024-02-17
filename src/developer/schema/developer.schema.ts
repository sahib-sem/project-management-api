import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/user.role';

export type DeveloperDocument = HydratedDocument<Developer>;

@Schema()
export class Developer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: Role.Developer;

  @Prop({ required: true })
  contact_info: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);
