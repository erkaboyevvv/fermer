import mongoose from "mongoose";

export class CreateVaccinationHistoryDto {
  vaccine_id: mongoose.Schema.Types.ObjectId;
  animal_id: mongoose.Schema.Types.ObjectId;
  vaccine_date: Date;
  next_vaccination_date: Date;
  vaccination_phot: string;
  worker_id: mongoose.Schema.Types.ObjectId;
}
