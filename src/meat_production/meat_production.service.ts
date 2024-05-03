import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMeatProductionDto } from './dto/create-meat_production.dto';
import { UpdateMeatProductionDto } from './dto/update-meat_production.dto';
import { MeatProduction } from './model/meat_production.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animals } from '../animals/model/animal.model';

@Injectable()
export class MeatProductionService {
  constructor(
    @InjectModel(MeatProduction.name)
    private meatProductionModel: Model<MeatProduction>,
    @InjectModel(Animals.name) private animalModel: Model<Animals>,
  ) {}

  async create(createMeatProductionDto: CreateMeatProductionDto) {
    const { animal_id } = createMeatProductionDto;
    const animals = await this.animalModel.findById(animal_id);
    if (!animals) {
      throw new BadRequestException('Not found Animals');
    }

    const animal = await this.meatProductionModel.create(
      createMeatProductionDto,
    );

    return animal;
  }

  async findAll() {
    return this.meatProductionModel.find().populate('animal_id');
  }

  async findOne(id: string) {
    return this.meatProductionModel.findById(id);
  }

  async update(id: string, updateMeatProductionDto: UpdateMeatProductionDto) {
    return this.meatProductionModel.findByIdAndUpdate(
      id,
      updateMeatProductionDto,
      { new: true },
    );
  }

  async remove(id: string) {
    return this.meatProductionModel.deleteOne({ _id: id });
  }
}
