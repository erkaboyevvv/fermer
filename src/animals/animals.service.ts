import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animals } from './model/animal.model';
import { Model } from 'mongoose';
import { Animal_type } from '../animals_type/model/animals_type.model';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectModel(Animals.name) private animalModel: Model<Animals>,
    @InjectModel(Animal_type.name) private ani_typeModel: Model<Animal_type>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto) {
    const { animal_type_id } = createAnimalDto;
    const ani_type = await this.ani_typeModel.findById(animal_type_id);
    if (!ani_type) {
      throw new BadRequestException('Not found Animal Type');
    }

    const animal = await this.ani_typeModel.create(createAnimalDto);

    return animal
  }

  async findAll() {
    return this.animalModel.find().populate('animal_type_id');
  }

  async findOne(id: string) {
    return this.animalModel.findById(id);
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    return this.animalModel.findByIdAndUpdate(id, updateAnimalDto);
  }

  async remove(id: string) {
    return this.animalModel.deleteOne({ _id: id });
  }
}
