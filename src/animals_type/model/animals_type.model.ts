import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type Animal_typeDocument = HydratedDocument<Animal_type>;

@Schema()
export class Animal_type {
  @Prop({ required: true })
  type_name: string;

  @Prop()
  description: string;
}

export const Animal_typeSchema = SchemaFactory.createForClass(Animal_type);
