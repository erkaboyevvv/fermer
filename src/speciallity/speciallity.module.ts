import { Module } from '@nestjs/common';
import { SpeciallityService } from './speciallity.service';
import { SpeciallityController } from './speciallity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Speciallity, SpeciallitySchema } from './schemas/speciallity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Speciallity.name, schema: SpeciallitySchema },
    ]),
  ],
  controllers: [SpeciallityController],
  providers: [SpeciallityService],
})
export class SpeciallityModule {}
