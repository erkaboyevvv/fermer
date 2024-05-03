import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalsTypeService } from './animals_type.service';
import { CreateAnimalsTypeDto } from './dto/create-animals_type.dto';
import { UpdateAnimalsTypeDto } from './dto/update-animals_type.dto';

@Controller('animals-type')
export class AnimalsTypeController {
  constructor(private readonly animalsTypeService: AnimalsTypeService) {}

  @Post()
  create(@Body() createAnimalsTypeDto: CreateAnimalsTypeDto) {
    return this.animalsTypeService.create(createAnimalsTypeDto);
  }

  @Get()
  findAll() {
    return this.animalsTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalsTypeDto: UpdateAnimalsTypeDto) {
    return this.animalsTypeService.update(id, updateAnimalsTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsTypeService.remove(id);
  }
}
