import mongoose from "mongoose";

export class CreateFiberProductionDto {
  fiber_yield: number;
  shearing_schedule: number;
  fiber_quality: number;
  animal_id: mongoose.Schema.Types.ObjectId;
}
