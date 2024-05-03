import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animals } from '../../animals/model/animal.model';
import { Worker } from '../../worker/schemas/worker.schema';

export type FeedingDocument = HydratedDocument<Feeding>;

@Schema()
export class Feeding {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animals' })
  animal_id: Animals;

  @Prop()
  feeding_schefules: number;

  @Prop()
  types_of_feed: number;

  @Prop()
  dietary: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' })
  worker_id: Worker;
}

export const FeedingSchema = SchemaFactory.createForClass(Feeding);
