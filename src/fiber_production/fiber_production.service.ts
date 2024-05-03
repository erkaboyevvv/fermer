import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFiberProductionDto } from './dto/create-fiber_production.dto';
import { UpdateFiberProductionDto } from './dto/update-fiber_production.dto';
import { Animals } from '../animals/model/animal.model';
import { InjectModel } from '@nestjs/mongoose';
import { FiberProduction } from './model/fiber_production.model';
import { Model } from 'mongoose';

@Injectable()
export class FiberProductionService {
  constructor(
    @InjectModel(FiberProduction.name)
    private fiberProductionModel: Model<FiberProduction>,
    @InjectModel(Animals.name) private animalModel: Model<Animals>,
  ) {}

  async create(createFiberProductionDto: CreateFiberProductionDto) {
    const { animal_id } = createFiberProductionDto;
    const animals = await this.animalModel.findById(animal_id);
    if (!animals) {
      throw new BadRequestException('Not found Animals');
    }

    const animal = await this.fiberProductionModel.create(
      createFiberProductionDto,
    );

    return animal;
  }

  async findAll() {
    return this.fiberProductionModel.find().populate('animal_id');
  }

  async findOne(id: string) {
    return this.fiberProductionModel.findById(id);
  }

  async update(id: string, updateFiberProductionDto: UpdateFiberProductionDto) {
    return this.fiberProductionModel.findByIdAndUpdate(
      id,
      updateFiberProductionDto,
      { new: true },
    );
  }

  async remove(id: string) {
    return this.fiberProductionModel.deleteOne({ _id: id });
  }
}
