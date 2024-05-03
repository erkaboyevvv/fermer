import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Animals, AnimalsSchema } from './model/animal.model';
import {
  Animal_type,
  Animal_typeSchema,
} from '../animals_type/model/animals_type.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Animals.name,
        schema: AnimalsSchema,
      },
      {
        name: Animal_type.name,
        schema: Animal_typeSchema,
      },
    ]),
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
