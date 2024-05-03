import { Injectable } from '@nestjs/common';
import { CreateAnimalsTypeDto } from './dto/create-animals_type.dto';
import { UpdateAnimalsTypeDto } from './dto/update-animals_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal_type } from './model/animals_type.model';
import { Model } from 'mongoose';

@Injectable()
export class AnimalsTypeService {
  constructor(
    @InjectModel(Animal_type.name) private animalTypeModel: Model<Animal_type>,
  ) {}

  async create(createAnimalsTypeDto: CreateAnimalsTypeDto) {
    return this.animalTypeModel.create(createAnimalsTypeDto);
  }

  async findAll() {
    return this.animalTypeModel.find();
  }

  async findOne(id: string) {
    return this.animalTypeModel.findById(id);
  }

  async update(id: string, updateAnimalsTypeDto: UpdateAnimalsTypeDto) {
    return this.animalTypeModel.findByIdAndUpdate(id, updateAnimalsTypeDto);
  }

  async remove(id: string) {
    return this.animalTypeModel.deleteOne({ _id: id });
  }
}
