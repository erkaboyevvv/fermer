import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { SpeciallityModule } from './speciallity/speciallity.module';
import { WorkerModule } from './worker/worker.module';
import { VaccinationHistoryModule } from './vaccination_history/vaccination_history.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { AnimalsModule } from './animals/animals.module';
import { AnimalsTypeModule } from './animals_type/animals_type.module';
import { RecordsOfFeedingModule } from './records_of_feeding/records_of_feeding.module';
import { MeatProductionModule } from './meat_production/meat_production.module';
import { FiberProductionModule } from './fiber_production/fiber_production.module';
import { MilkProductionModule } from './milk_production/milk_production.module';
import { InfoModule } from './info/info.module';
import { BlocksModule } from './blocks/blocks.module';
import { FeedingModule } from './feeding/feeding.module';
import { RecordOfIllnessModule } from './record_of_illness/record_of_illness.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdminModule,
    SpeciallityModule,
    WorkerModule,
    VaccinationHistoryModule,
    VaccineModule,
    AnimalsModule,
    AnimalsTypeModule,
    RecordsOfFeedingModule,
    MeatProductionModule,
    FiberProductionModule,
    MilkProductionModule,
    InfoModule,
    BlocksModule,
    FeedingModule,
    RecordOfIllnessModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
