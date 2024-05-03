import { Module } from '@nestjs/common';
import { AnimalsTypeService } from './animals_type.service';
import { AnimalsTypeController } from './animals_type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal_type, Animal_typeSchema } from './model/animals_type.model';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Animal_type.name,
    schema: Animal_typeSchema
  }])],
  controllers: [AnimalsTypeController],
  providers: [AnimalsTypeService],
})
export class AnimalsTypeModule {}
