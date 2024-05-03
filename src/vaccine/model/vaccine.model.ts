import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VaccineDocument = HydratedDocument<Vaccine>;

@Schema()
export class Vaccine {
  @Prop({ required: true })
  vaccine_type: string;

  @Prop()
  vaccine_name: string;
}

export const VaccineSchema = SchemaFactory.createForClass(Vaccine);
