import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Worker, WorkerSchema } from './schemas/worker.schema';
import {
  Speciallity,
  SpeciallitySchema,
} from '../speciallity/schemas/speciallity.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Worker.name,
        schema: WorkerSchema,
      },
      {
        name: Speciallity.name,
        schema: SpeciallitySchema,
      },
    ]),
    JwtModule.register({}),
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
