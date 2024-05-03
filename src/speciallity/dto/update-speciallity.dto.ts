import { PartialType } from '@nestjs/mapped-types';
import { CreateSpeciallityDto } from './create-speciallity.dto';

export class UpdateSpeciallityDto extends PartialType(CreateSpeciallityDto) {}
