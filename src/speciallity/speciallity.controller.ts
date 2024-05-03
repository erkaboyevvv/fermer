import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpeciallityService } from './speciallity.service';
import { CreateSpeciallityDto } from './dto/create-speciallity.dto';
import { UpdateSpeciallityDto } from './dto/update-speciallity.dto';

@Controller('speciallity')
export class SpeciallityController {
  constructor(private readonly speciallityService: SpeciallityService) {}

  @Post()
  create(@Body() createSpeciallityDto: CreateSpeciallityDto) {
    return this.speciallityService.create(createSpeciallityDto);
  }

  @Get()
  findAll() {
    return this.speciallityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speciallityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpeciallityDto: UpdateSpeciallityDto) {
    return this.speciallityService.update(+id, updateSpeciallityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speciallityService.remove(+id);
  }
}
