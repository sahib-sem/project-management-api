import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now() })
  start_date: Date;

  @Prop({ default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
  end_date: Date;

  @Prop({ default: 0 })
  progress: number;

  @Prop({ type: String, ref: 'User', required: true, select: false })
  owner: string;

  @Prop({ type: [{ type: String, ref: 'User' }] })
  developers: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
