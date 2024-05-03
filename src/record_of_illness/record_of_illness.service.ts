import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecordOfIllnessDto } from './dto/create-record_of_illness.dto';
import { UpdateRecordOfIllnessDto } from './dto/update-record_of_illness.dto';
import { RecordOfIllness } from './schemas/record_of_illness.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Animals } from '../animals/model/animal.model';
import { Worker } from '../worker/schemas/worker.schema';
import { Model } from 'mongoose';

@Injectable()
export class RecordOfIllnessService {
  constructor(
    @InjectModel(RecordOfIllness.name)
    private recordOfIllnessModel: Model<RecordOfIllness>,
    @InjectModel(Animals.name) private animalModel: Model<Animals>,
    @InjectModel(Worker.name) private workerModel: Model<Worker>,
  ) {}

  async create(createRecordOfIllnessDto: CreateRecordOfIllnessDto) {
    const { animal_id, worker_id } = createRecordOfIllnessDto;
    const animal = await this.animalModel.findById(animal_id);
    const worker = await this.workerModel.findById(worker_id);
    if (!animal || !worker) {
      throw new BadRequestException('Not found');
    }

    const record_of_illness = await this.recordOfIllnessModel.create(
      createRecordOfIllnessDto,
    );
    return record_of_illness;
  }

  findAll() {
    return this.recordOfIllnessModel.find().populate('animal_id', 'worker_id');
  }

  findOne(id: string) {
    return this.recordOfIllnessModel.findById(id);
  }

  update(id: string, updateRecordOfIllnessDto: UpdateRecordOfIllnessDto) {
    return this.recordOfIllnessModel.findByIdAndUpdate(
      id,
      updateRecordOfIllnessDto,
      { new: true },
    );
  }

  remove(id: string) {
    return this.recordOfIllnessModel.deleteMany({ _id: id });
  }
}
