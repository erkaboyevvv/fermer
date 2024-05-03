import mongoose from "mongoose";

export class CreateFeedingDto {
  animal_id: mongoose.Schema.Types.ObjectId;
  feeding_schefules: number;
  types_of_feed: number;
  dietary: number;
  worker_id: mongoose.Schema.Types.ObjectId;
}
