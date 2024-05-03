import { Module } from '@nestjs/common';
import { RecordOfIllnessService } from './record_of_illness.service';
import { RecordOfIllnessController } from './record_of_illness.controller';
import { Animals, AnimalsSchema } from '../animals/model/animal.model';
import { Worker, WorkerSchema } from '../worker/schemas/worker.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordOfIllness, RecordOfIllnessSchema } from './schemas/record_of_illness.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecordOfIllness.name,
        schema: RecordOfIllnessSchema,
      },
      {
        name: Animals.name,
        schema: AnimalsSchema,
      },
      {
        name: Worker.name,
        schema: WorkerSchema,
      },
    ]),
  ],
  controllers: [RecordOfIllnessController],
  providers: [RecordOfIllnessService],
})
export class RecordOfIllnessModule {}
