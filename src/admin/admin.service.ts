import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { LoginAdminDto } from './dto/loginAdmin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(admin: AdminDocument) {
    const payload = {
      id: admin._id,
      isActive: admin.is_active,
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

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    try {
      // Check if admin with the same email already exists
      const admin = await this.adminModel.findOne({
        email: createAdminDto.email,
      });
      if (admin) {
        throw new BadRequestException('This admin already exists');
      }
      // Check if password and confirm password match
      if (createAdminDto.password !== createAdminDto.confirm_password) {
        throw new BadRequestException('Password does not match');
      }
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);
      
      // Generate activation link
      const activationLink = uuidv4();
      
      // Create a new admin with hashed password and activation link
      console.log("name");
      const newAdmin = await this.adminModel.create({
        ...createAdminDto,
        hashedPassword,
        activationLink,
      });

      // Generate tokens for the new admin
      const tokens = await this.getTokens(newAdmin);

      // Set refresh token as a cookie in the response
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
        httpOnly: true, // HTTP only cookie
      });

      // Prepare response object
      const response = {
        message: 'Admin registered',
        admin: newAdmin,
        tokens,
      };

      return response; // Return the response object
    } catch (error) {
      // Handle any errors
      throw new BadRequestException('Registration failed');
    }
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    try {
      const { email, password } = loginAdminDto;
      const admin = await this.adminModel.findOne({ email });
      if (!admin) {
        throw new BadRequestException('Admin not found');
      }
      const isMatchPass = await bcrypt.compare(password, admin.hashed_password);

      if (!isMatchPass) {
        throw new BadRequestException('Password is not match');
      }

      // Generate tokens for the admin
      const tokens = await this.getTokens(admin);

      // Set refresh token as a cookie in the response
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
        httpOnly: true, // HTTP only cookie
      });

      // Prepare response object
      const response = {
        message: 'Admin logged in successfully',
        admin,
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

      // Update the admin with null refresh token
      await this.adminModel.findByIdAndUpdate(
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
      const admin = await this.adminModel.findById(userId);

      if (!admin || !admin.hashed_refresh_token) {
        throw new BadRequestException(
          'Admin not found or refresh token not available',
        );
      }

      const tokenMatch = await bcrypt.compare(
        refreshToken,
        admin.hashed_refresh_token,
      );

      if (!tokenMatch) {
        throw new ForbiddenException('Forbidden');
      }

      // Generate new tokens for the admin
      const tokens = await this.getTokens(admin);

      // Set refresh token as a cookie in the response
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
        httpOnly: true, // HTTP only cookie
      });

      // Prepare response object
      const response = {
        message: 'Admin refreshed',
        admin,
        tokens,
      };

      return response;
    } catch (error) {
      // Handle any errors
      throw new BadRequestException('Refresh token failed');
    }
  }

  async create(createAdminDto: CreateAdminDto) {
    try {
      const { password, confirm_password } = createAdminDto;
      if (password !== confirm_password) {
        throw new BadRequestException("Passwords don't match");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 7);

      // Create a new admin with hashed password
      const newAdmin = await this.adminModel.create({
        ...createAdminDto,
        hashedPassword,
      });

      return newAdmin;
    } catch (error) {
      // Handle any errors
      throw new BadRequestException('Admin creation failed');
    }
  }

  findAll() {
    return this.adminModel.find();
  }

  findOne(id: string) {
    return this.adminModel.findById(id);
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.findByIdAndUpdate(id, updateAdminDto, { new: true });
  }
  async remove(id: string) {
    try {
      const deletedAdmin = await this.adminModel.findByIdAndDelete(id);
      if (!deletedAdmin) {
        throw new BadRequestException('Admin not found');
      }
      return {
        message: 'Admin deleted successfully',
        admin: deletedAdmin,
      };
    } catch (error) {
      throw new BadRequestException('Failed to delete admin');
    }
  }
}
