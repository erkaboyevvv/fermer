import { Injectable } from '@nestjs/common';
import { CreateRecordsOfFeedingDto } from './dto/create-records_of_feeding.dto';
import { UpdateRecordsOfFeedingDto } from './dto/update-records_of_feeding.dto';
import { RecordsOfFeeding } from './model/records_of_feeding.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RecordsOfFeedingService {
  constructor(
    @InjectModel(RecordsOfFeeding.name)
    private recordsOfFeedingModel: Model<RecordsOfFeeding>,
  ) {}

  create(createRecordsOfFeedingDto: CreateRecordsOfFeedingDto) {
    return this.recordsOfFeedingModel.create(createRecordsOfFeedingDto);
  }

  findAll() {
    return this.recordsOfFeedingModel.find();
  }

  findOne(id: string) {
    return this.recordsOfFeedingModel.findById(id);
  }

  update(id: string, updateRecordsOfFeedingDto: UpdateRecordsOfFeedingDto) {
    return this.recordsOfFeedingModel.findByIdAndUpdate(
      id,
      updateRecordsOfFeedingDto,
    );
  }

  remove(id: string) {
    return this.recordsOfFeedingModel.deleteOne({ _id: id });
  }
}
