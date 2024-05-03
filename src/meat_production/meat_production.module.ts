import { Module } from '@nestjs/common';
import { MeatProductionService } from './meat_production.service';
import { MeatProductionController } from './meat_production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MeatProduction, MeatProductionSchema } from './model/meat_production.model';
import { Animals, AnimalsSchema } from '../animals/model/animal.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MeatProduction.name,
        schema: MeatProductionSchema,
      },
      {
        name: Animals.name,
        schema: AnimalsSchema,
      },
    ]),
  ],
  controllers: [MeatProductionController],
  providers: [MeatProductionService],
})
export class MeatProductionModule {}
