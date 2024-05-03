import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { Blocks } from './schemas/block.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BlocksService {
  constructor(@InjectModel(Blocks.name) private blocksModel: Model<Blocks>) {}

  create(createBlockDto: CreateBlockDto) {
    return this.blocksModel.create(createBlockDto);
  }

  findAll() {
    return this.blocksModel.find();
  }

  findOne(id: string) {
    return this.blocksModel.findById(id);
  }

  update(id: string, updateBlockDto: UpdateBlockDto) {
    return this.blocksModel.findByIdAndUpdate(id, updateBlockDto);
  }

  remove(id: string) {
    return this.blocksModel.deleteOne({ _id: id });
  }
}
