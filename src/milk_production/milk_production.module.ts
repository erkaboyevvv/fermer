import { Module } from '@nestjs/common';
import { MilkProductionService } from './milk_production.service';
import { MilkProductionController } from './milk_production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MilkProduction, MilkProductionSchema } from './model/milk_production.entity';
import { Animals, AnimalsSchema } from '../animals/model/animal.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MilkProduction.name,
        schema: MilkProductionSchema,
      },
      {
        name: Animals.name,
        schema: AnimalsSchema,
      },
    ]),
  ],
  controllers: [MilkProductionController],
  providers: [MilkProductionService],
})
export class MilkProductionModule {}
