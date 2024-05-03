import { Module } from '@nestjs/common';
import { FeedingService } from './feeding.service';
import { FeedingController } from './feeding.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Animals, AnimalsSchema } from '../animals/model/animal.model';
import { Feeding, FeedingSchema } from './schemas/feeding.schema';
import { Worker, WorkerSchema } from '../worker/schemas/worker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Feeding.name,
        schema: FeedingSchema,
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
  controllers: [FeedingController],
  providers: [FeedingService],
})
export class FeedingModule {}
