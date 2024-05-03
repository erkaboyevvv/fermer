import mongoose from "mongoose";

export class CreateInfoDto {
  weight: number;
  color: string;
  height: number;
  breed: string;
  gender: string;
  birth_or_acquisition: Date;
  blocks_id: mongoose.Schema.Types.ObjectId;
  animals_id: mongoose.Schema.Types.ObjectId;
  parent_id: mongoose.Schema.Types.ObjectId;
}
