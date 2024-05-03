import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Vaccine } from '../../vaccine/model/vaccine.model';
import { Animals } from '../../animals/model/animal.model';
import { Worker } from '../../worker/schemas/worker.schema';

export type Vaccine_historyDocument = HydratedDocument<Vaccine_history>;

@Schema()
export class Vaccine_history {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vaccine' })
  vaccine_id: Vaccine;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animals' })
  animal_id: Animals;

  @Prop()
  vaccine_date: Date;

  @Prop()
  next_vaccination_date: Date;

  @Prop()
  vaccination_phot: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' })
  worker_id: Worker;
}

export const Vaccine_historySchema =
  SchemaFactory.createForClass(Vaccine_history);
