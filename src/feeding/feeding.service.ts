import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Feeding } from './schemas/feeding.schema';
import { Worker } from '../worker/schemas/worker.schema';
import { Model } from 'mongoose';
import { Animals } from '../animals/model/animal.model';

@Injectable()
export class FeedingService {
  constructor(
    @InjectModel(Feeding.name) private feedingModel: Model<Feeding>,
    @InjectModel(Animals.name) private animalModel: Model<Animals>,
    @InjectModel(Worker.name) private workerModel: Model<Worker>,
  ) {}

  async create(createFeedingDto: CreateFeedingDto) {
    const { animal_id, worker_id } = createFeedingDto;
    const animal = await this.animalModel.findById(animal_id);
    const worker = await this.animalModel.findById(worker_id);
    if (!animal || !worker) {
      throw new BadRequestException('Not found ');
    }

    const feeding = await this.feedingModel.create(createFeedingDto);

    return feeding;
  }

  findAll() {
    return this.feedingModel.find().populate('animal_id', 'worker_id');
  }

  findOne(id: string) {
    return this.feedingModel.findById(id);
  }

  update(id: string, updateFeedingDto: UpdateFeedingDto) {
    return this.feedingModel.findByIdAndUpdate(id, updateFeedingDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.feedingModel.deleteOne({ _id: id });
  }
}
