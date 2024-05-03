import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animals } from '../../animals/model/animal.model';

export type MeatProductionDocument = HydratedDocument<MeatProduction>;

@Schema()
export class MeatProduction {
  @Prop({ required: true })
  meat_yield: number;

  @Prop()
  slaughter_date: Date;

  @Prop()
  shearing_schedule: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animals' })
  animal_id: Animals;
}

export const MeatProductionSchema = SchemaFactory.createForClass(MeatProduction);
