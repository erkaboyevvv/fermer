import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animals } from '../../animals/model/animal.model';

export type MilkProductionDocument = HydratedDocument<MilkProduction>;

@Schema()
export class MilkProduction {
  @Prop({ required: true })
  milk_yield: number;

  @Prop()
  milk_schedule: number;

  @Prop()
  milk_quality: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animals' })
  animal_id: Animals;
}

export const MilkProductionSchema =
  SchemaFactory.createForClass(MilkProduction);
