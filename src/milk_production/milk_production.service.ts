import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMilkProductionDto } from './dto/create-milk_production.dto';
import { UpdateMilkProductionDto } from './dto/update-milk_production.dto';
import { MilkProduction } from './model/milk_production.entity';
import { Animals } from '../animals/model/animal.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MilkProductionService {
  constructor(
    @InjectModel(MilkProduction.name)
    private milkProductionModel: Model<MilkProduction>,
    @InjectModel(Animals.name) private animalModel: Model<Animals>,
  ) {}

  async create(createMilkProductionDto: CreateMilkProductionDto) {
    const { animal_id } = createMilkProductionDto;
    const animals = await this.animalModel.findById(animal_id);
    if (!animals) {
      throw new BadRequestException('Not found Animals');
    }

    const animal = await this.milkProductionModel.create(
      createMilkProductionDto,
    );

    return animal;
  }

  findAll() {
    return this.milkProductionModel.find().populate('animal_id');
  }

  findOne(id: string) {
    return this.milkProductionModel.findById(id);
  }

  update(id: string, updateMilkProductionDto: UpdateMilkProductionDto) {
    return this.milkProductionModel.findByIdAndUpdate(
      id,
      updateMilkProductionDto,
      { new: true },
    );
  }

  remove(id: string) {
    return this.milkProductionModel.deleteOne({ _id: id })
  }
}
