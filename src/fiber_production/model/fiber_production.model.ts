import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animals } from '../../animals/model/animal.model';

export type FiberProductionDocument = HydratedDocument<FiberProduction>;

@Schema()
export class FiberProduction {
  @Prop({ required: true })
  fiber_yield: number;

  @Prop()
  shearing_schedule: number;

  @Prop()
  fiber_quality: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animals' })
  animal_id: Animals;
}

export const FiberProductionSchema = SchemaFactory.createForClass(FiberProduction);
