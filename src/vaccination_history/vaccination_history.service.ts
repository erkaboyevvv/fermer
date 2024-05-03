import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVaccinationHistoryDto } from './dto/create-vaccination_history.dto';
import { UpdateVaccinationHistoryDto } from './dto/update-vaccination_history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vaccine_history } from './model/vaccination_history.model';
import { Model } from 'mongoose';
import { Animals } from '../animals/model/animal.model';
import { Vaccine } from '../vaccine/model/vaccine.model';
import { Worker } from '../worker/schemas/worker.schema';

@Injectable()
export class VaccinationHistoryService {
  constructor(
    @InjectModel(Vaccine_history.name)
    private vac_hisModel: Model<Vaccine_history>,
    @InjectModel(Animals.name) private animalsModel: Model<Animals>,
    @InjectModel(Vaccine.name) private vacModel: Model<Vaccine>,
    @InjectModel(Worker.name) private workerModel: Model<Worker>,
  ) {}

  async create(createVaccinationHistoryDto: CreateVaccinationHistoryDto) {
    const { animal_id, vaccine_id, worker_id } = createVaccinationHistoryDto;
    const animal = await this.animalsModel.findById(animal_id);
    const vac = await this.vacModel.findById(vaccine_id);
    const wor = await this.workerModel.findById(worker_id);

    if (!animal) {
      throw new BadRequestException('Not found Animals');
    } else if (!vac) {
      throw new BadRequestException('Not found Vaccine');
    } else if (!wor) {
      throw new BadRequestException('Not found Worker');
    }
    const vac_his = await this.vac_hisModel.create(createVaccinationHistoryDto);

    return vac_his;
  }

  async findAll() {
    return this.vac_hisModel
      .find()
      .populate('vaccine_id', 'animal_id', 'worker_id');
  }

  async findOne(id: string) {
    return this.vac_hisModel.findById(id);
  }

  async update(
    id: string,
    updateVaccinationHistoryDto: UpdateVaccinationHistoryDto,
  ) {
    return this.vac_hisModel.findByIdAndUpdate(id, updateVaccinationHistoryDto);
  }

  async remove(id: string) {
    return this.vac_hisModel.deleteOne({ _id: id });
  }
}
