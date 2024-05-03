import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './schemas/admin.schema';
import { LoginAdminDto } from './dto/loginAdmin.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { jwtGuard } from '../guards/jwtguard.guard';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Register a new user' }) // Description for Swagger documentation
  @ApiResponse({ status: 201, type: Admin.name}) // Response definition for Swagger documentation
  @Post('signup') // Defines HTTP POST method and endpoint route
  async registration(
    @Body() createAdminDto: CreateAdminDto, // Request body containing user data
    @Res({ passthrough: true }) res: Response, // Express Response object for setting cookies
  ) {
    return this.adminService.registration(createAdminDto, res); // Calls the registration method from the service
  }


  @ApiOperation({ summary: 'Login as an admin' })
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'Logout as an admin' })
  @UseGuards(jwtGuard)
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Refresh token for an admin' })
  @HttpCode(200)
  @Post(':id/refresh')
  async refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
