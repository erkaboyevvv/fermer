import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res, UseGuards } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Worker } from './schemas/worker.schema';
import { Response } from 'express';
import { LoginWorkerDto } from './dto/loginWorker.dto';
import { jwtGuard } from '../guards/jwtguard.guard';
import { CookieGetter } from '../decorators/cookieGetter.decorator';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @ApiOperation({ summary: 'Register a new user' }) // Description for Swagger documentation
  @ApiResponse({ status: 201, type: Worker.name }) // Response definition for Swagger documentation
  @Post('signup') // Defines HTTP POST method and endpoint route
  async registration(
    @Body() createWorkerDto: CreateWorkerDto, // Request body containing user data
    @Res({ passthrough: true }) res: Response, // Express Response object for setting cookies
  ) {
    return this.workerService.registration(createWorkerDto, res); // Calls the registration method from the service
  }

  @ApiOperation({ summary: 'Login as an admin' })
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() loginWorkerDto: LoginWorkerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.login(loginWorkerDto, res);
  }

  @ApiOperation({ summary: 'Logout as an admin' })
  @UseGuards(jwtGuard)
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Refresh token for an admin' })
  @HttpCode(200)
  @Post(':id/refresh')
  async refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.refreshToken(+id, refreshToken, res);
  }

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.create(createWorkerDto);
  }

  @Get()
  findAll() {
    return this.workerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workerService.update(id, updateWorkerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.workerService.remove(id);
  }
}
