import { Injectable } from '@nestjs/common';
import { CreateSpeciallityDto } from './dto/create-speciallity.dto';
import { UpdateSpeciallityDto } from './dto/update-speciallity.dto';
import { Speciallity } from './schemas/speciallity.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SpeciallityService {
  constructor(
    @InjectModel(Speciallity.name) private speciallityModel: Model<Speciallity>,
  ) {}

  create(createSpeciallityDto: CreateSpeciallityDto) {
    return this.speciallityModel.create(createSpeciallityDto)
  }

  findAll() {
    return this.speciallityModel.find().populate('workers');
  }

  findOne(id: number) {
    return `This action returns a #${id} speciallity`;
  }

  update(id: number, updateSpeciallityDto: UpdateSpeciallityDto) {
    return `This action updates a #${id} speciallity`;
  }

  remove(id: number) {
    return `This action removes a #${id} speciallity`;
  }
}
