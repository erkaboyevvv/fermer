import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Speciallity } from '../speciallity/schemas/speciallity.schema';
import { Worker, WorkerDocument } from './schemas/worker.schema';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginWorkerDto } from './dto/loginWorker.dto';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker.name) private workerModel: Model<Worker>,
    @InjectModel(Speciallity.name) private speciallityModel: Model<Speciallity>,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(worker: WorkerDocument) {
    const payload = {
      id: worker._id,
    };
    const [accessToken, refreshToken] = await Promise.all([
      // Signing access token with specified expiration and secret key
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      // Signing refresh token with specified expiration and secret key
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async registration(createWorkerDto: CreateWorkerDto, res: Response) {
    try {
      // Check if worker with the same username already exists
      const worker = await this.workerModel.findOne({
        username: createWorkerDto.username,
      });
      if (worker) {
        throw new BadRequestException('This worker already exists');
      }
      // Check if password and confirm password match
      if (createWorkerDto.password !== createWorkerDto.comfirm_password) {
        throw new BadRequestException('Password does not match');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(createWorkerDto.password, 7);

      // Generate activation link
      const activationLink = uuidv4();

      // Create a new worker with hashed password and activation link
      const newAdmin = await this.workerModel.create({
        ...createWorkerDto,
        hashedPassword,
        activationLink,
      });

      // Generate tokens for the new worker
      const tokens = await this.getTokens(newAdmin);

      // Set refresh token as a cookie in the response
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
        httpOnly: true, // HTTP only cookie
      });

      // Prepare response object
      const response = {
        message: 'Admin registered',
        worker: newAdmin,
        tokens,
      };

      return response; // Return the response object
    } catch (error) {
      // Handle any errors
      throw new BadRequestException('Registration failed');
    }
  }

  async login(loginWorkerDto: LoginWorkerDto, res: Response) {
    try {
      const { username, password } = loginWorkerDto;
      const worker = await this.workerModel.findOne({ username });
      if (!worker) {
        throw new BadRequestException('Admin not found');
      }

      // Generate tokens for the worker
      const tokens = await this.getTokens(worker);

      // Set refresh token as a cookie in the response
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
        httpOnly: true, // HTTP only cookie
      });

      // Prepare response object
      const response = {
        message: 'Admin logged in successfully',
        worker,
        tokens,
      };

      return response; // Return the response object
    } catch (error) {
      // Handle any errors
      throw new BadRequestException('Login failed');
    }
  }

  async logout(refreshToken: string, res: Response) {
    try {
      const userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      if (!userData) {
        throw new ForbiddenException('Admin not verified');
      }

      // Update the worker with null refresh token
      await this.workerModel.findByIdAndUpdate(
        userData.id,
        { hashedRefreshToken: null },
        { new: true },
      );

      // Clear refresh token cookie
      res.clearCookie('refresh_token');

      const response = {
        message: 'Admin logged out successfully',
      };
      return response;
    } catch (error) {
      // Handle any errors
      throw new BadRequestException('Logout failed');
    }
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    try {
      const decodedToken = await this.jwtService.decode(refreshToken);
      if (userId !== decodedToken['id']) {
        throw new BadRequestException('User not authorized');
      }
      const worker = await this.workerModel.findById(userId);

      if (!worker || !worker.hashed_refresh_token) {
        throw new BadRequestException(
          'Admin not found or refresh token not available',
        );
      }

      const tokenMatch = await bcrypt.compare(
        refreshToken,
        worker.hashed_refresh_token,
      );

      if (!tokenMatch) {
        throw new ForbiddenException('Forbidden');
      }

      // Generate new tokens for the worker
      const tokens = await this.getTokens(worker);

      // Set refresh token as a cookie in the response
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
        httpOnly: true, // HTTP only cookie
      });

      // Prepare response object
      const response = {
        message: 'Admin refreshed',
        worker,
        tokens,
      };

      return response;
    } catch (error) {
      // Handle any errors
      throw new BadRequestException('Refresh token failed');
    }
  }

  async create(createWorkerDto: CreateWorkerDto) {
    const { speciallity_id } = createWorkerDto;
    const spec = await this.speciallityModel.findById(speciallity_id);

    if (!spec) {
      throw new BadRequestException('Not found Speciallity');
    }
    const worker = await this.workerModel.create(createWorkerDto);
    spec.workers.push(worker);

    await spec.save();

    return worker;
  }
  findAll() {
    return this.workerModel.find().populate('speciallity_id');
  }

  findOne(id: string) {
    return this.workerModel.findById(id);
  }

  update(id: string, updateWorkerDto: UpdateWorkerDto) {
    return this.workerModel.findByIdAndUpdate(id, updateWorkerDto, {
      new: true,
    });
  }

  async remove(id: string) {
    try {
      const deletedWorker = await this.workerModel.findByIdAndDelete(id);
      if (!deletedWorker) {
        throw new BadRequestException('Worker not found');
      }
      return {
        message: 'Worker deleted successfully',
        worker: deletedWorker,
      };
    } catch (error) {
      throw new BadRequestException('Failed to delete worker');
    }
  }
}
