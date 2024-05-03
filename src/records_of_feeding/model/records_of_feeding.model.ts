import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecordsOfFeedingDocument = HydratedDocument<RecordsOfFeeding>;

@Schema()
export class RecordsOfFeeding {
  @Prop({ required: true })
  date: Date;

  @Prop()
  consumption: number;

  @Prop()
  feeding_id: number;
}

export const RecordsOfFeedingSchema = SchemaFactory.createForClass(RecordsOfFeeding);
