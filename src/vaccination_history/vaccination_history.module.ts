import { Module } from '@nestjs/common';
import { VaccinationHistoryService } from './vaccination_history.service';
import { VaccinationHistoryController } from './vaccination_history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Vaccine_history,
  Vaccine_historySchema,
} from './model/vaccination_history.model';
import { Animals, AnimalsSchema } from '../animals/model/animal.model';
import { Vaccine, VaccineSchema } from '../vaccine/model/vaccine.model';
import { Worker, WorkerSchema } from '../worker/schemas/worker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Vaccine_history.name,
        schema: Vaccine_historySchema,
      },
      {
        name: Animals.name,
        schema: AnimalsSchema,
      },
      {
        name: Vaccine.name,
        schema: VaccineSchema,
      },
      {
        name: Worker.name,
        schema: WorkerSchema,
      },
    ]),
  ],
  controllers: [VaccinationHistoryController],
  providers: [VaccinationHistoryService],
})
export class VaccinationHistoryModule {}
