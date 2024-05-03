import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animals } from '../animals/model/animal.model';
import { Model } from 'mongoose';
import { Blocks } from '../blocks/schemas/block.model';
import { Info } from './schemas/info.schema';

@Injectable()
export class InfoService {
  constructor(
    @InjectModel(Info.name) private infoModel: Model<Info>,
    @InjectModel(Blocks.name) private blocksModel: Model<Blocks>,
    @InjectModel(Animals.name) private animalModel: Model<Animals>,
  ) {}

  async create(createInfoDto: CreateInfoDto) {
    const { animals_id, blocks_id, parent_id } = createInfoDto;
    const block = await this.blocksModel.findById(blocks_id);
    const animal = await this.animalModel.findById(animals_id);
    const parent = await this.animalModel.findById(parent_id);
    if (!block || !animal || !parent) {
      throw new BadRequestException('Not found Animal Type');
    }

    const info = await this.infoModel.create(createInfoDto);

    return info;
  }

  findAll() {
    return this.animalModel
      .find()
      .populate('animals_id', 'parent_id', 'blocks_id');
  }

  findOne(id: string) {
    return this.infoModel.findById(id);
  }

  update(id: string, updateInfoDto: UpdateInfoDto) {
    return this.infoModel.findByIdAndUpdate(id, updateInfoDto);
  }

  remove(id: string) {
    return this.infoModel.deleteOne({ _id: id });
  }
}
