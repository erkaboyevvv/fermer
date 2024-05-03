import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalsTypeDto } from './create-animals_type.dto';

export class UpdateAnimalsTypeDto extends PartialType(CreateAnimalsTypeDto) {}
