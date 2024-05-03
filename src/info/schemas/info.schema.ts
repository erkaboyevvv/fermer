import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Blocks } from '../../blocks/schemas/block.model';
import { Animals } from '../../animals/model/animal.model';

export type InfoDocument = HydratedDocument<Info>;

@Schema()
export class Info {
  @Prop({ required: true })
  weight: number;

  @Prop()
  color: string;

  @Prop()
  height: number;

  @Prop()
  breed: string;

  @Prop()
  gender: string;

  @Prop()
  birth_or_acquisition: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blocks' })
  blocks_id: Blocks;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animals' })
  animals_id: Animals;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animals' })
  parent_id: Animals;
}

export const InfoSchema = SchemaFactory.createForClass(Info);
