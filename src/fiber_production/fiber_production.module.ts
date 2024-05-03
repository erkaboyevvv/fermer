import { Module } from '@nestjs/common';
import { FiberProductionService } from './fiber_production.service';
import { FiberProductionController } from './fiber_production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FiberProduction, FiberProductionSchema } from './model/fiber_production.model';
import { Animals, AnimalsSchema } from '../animals/model/animal.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FiberProduction.name,
        schema: FiberProductionSchema,
      },
      {
        name: Animals.name,
        schema: AnimalsSchema,
      },
    ]),
  ],
  controllers: [FiberProductionController],
  providers: [FiberProductionService],
})
export class FiberProductionModule {}
