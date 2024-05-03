import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animals } from '../../animals/model/animal.model';
import { Worker } from '../../worker/schemas/worker.schema';

export type RecordOfIllnessDocument = HydratedDocument<RecordOfIllness>;

@Schema()
export class RecordOfIllness {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animals' })
  animal_id: Animals;

  @Prop()
  illness_type: number;

  @Prop()
  date_disease: string;

  @Prop()
  medicine: Date;

  @Prop()
  date_treatment: string;

  @Prop()
  illness_photo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' })
  worker_id: Worker;
}

export const RecordOfIllnessSchema = SchemaFactory.createForClass(RecordOfIllness);
