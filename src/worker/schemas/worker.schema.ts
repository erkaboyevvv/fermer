import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Speciallity } from '../../speciallity/schemas/speciallity.schema';

export type WorkerDocument = HydratedDocument<Worker>;

@Schema({ versionKey: false })
export class Worker {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  experience: number;

  @Prop()
  phone_number: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop([String])
  worker_schedule: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Speciallity' })
  speciallity_id: Speciallity;

  @Prop()
  hashed_refresh_token: string;
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
