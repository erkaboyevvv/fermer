import mongoose from "mongoose";

export class CreateRecordOfIllnessDto {
  animal_id: mongoose.Schema.Types.ObjectId;
  illness_type: number;
  date_disease: string;
  medicine: Date;
  date_treatment: string;
  illness_photo: string;
  worker_id: mongoose.Schema.Types.ObjectId;
}
