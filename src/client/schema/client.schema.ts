import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/user.role';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: Role.Client;

  @Prop({ required: true })
  contant_info: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
