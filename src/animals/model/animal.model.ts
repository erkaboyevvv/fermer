import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal_type } from '../../animals_type/model/animals_type.model';

export type AnimalsDocument = HydratedDocument<Animals>;

@Schema()
export class Animals {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal_type' })
  animal_type_id: Animal_type;

  @Prop()
  photos: string;

  @Prop()
  unique_id: string;
}

export const AnimalsSchema = SchemaFactory.createForClass(Animals);
