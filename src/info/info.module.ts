import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Animals, AnimalsSchema } from '../animals/model/animal.model';
import { Info, InfoSchema } from './schemas/info.schema';
import { Blocks, BlocksSchema } from '../blocks/schemas/block.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Info.name,
        schema: InfoSchema,
      },
      {
        name: Blocks.name,
        schema: BlocksSchema,
      },
      {
        name: Animals.name,
        schema: AnimalsSchema,
      },
    ]),
  ],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
