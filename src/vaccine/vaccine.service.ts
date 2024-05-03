import { Injectable } from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vaccine } from './model/vaccine.model';
import { Model } from 'mongoose';

@Injectable()
export class VaccineService {
  constructor(
    @InjectModel(Vaccine.name) private vaccineModel: Model<Vaccine>,
  ) {}

  async create(createVaccineDto: CreateVaccineDto) {
    return this.vaccineModel.create(createVaccineDto);
  }

  async findAll() {
    return this.vaccineModel.find();
  }

  async findOne(id: string) {
    return this.vaccineModel.findById(id);
  }

  async update(id: string, updateVaccineDto: UpdateVaccineDto) {
    return this.vaccineModel.findByIdAndUpdate(id, updateVaccineDto);
  }

  async remove(id: string) {
    return this.vaccineModel.deleteOne({ _id: id });
  }
}
