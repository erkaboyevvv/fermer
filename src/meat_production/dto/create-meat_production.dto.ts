import mongoose from "mongoose";

export class CreateMeatProductionDto {
  meat_yield: number;
  slaughter_date: Date;
  shearing_schedule: number;
  animal_id: mongoose.Schema.Types.ObjectId;
}
