import mongoose from 'mongoose';

export class CreateWorkerDto {
  name: string;
  age: number;
  experience: number;
  phone_number: string;
  username: string;
  password: string;
  comfirm_password: string;
  worker_schedule: string[];
  speciallity_id: mongoose.Schema.Types.ObjectId;
}
