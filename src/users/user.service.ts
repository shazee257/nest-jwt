import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { hashPassword } from 'src/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findUser(query: {}): Promise<User> {
    return await this.userModel.findOne(query).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // find if user exists
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = new this.userModel();
    newUser.fullName = createUserDto.fullName;
    newUser.email = createUserDto.email;
    newUser.password = hashPassword(createUserDto.password);
    newUser.role = createUserDto.role;

    return await newUser.save();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updateUserDto.fullName) user.fullName = updateUserDto.fullName;
    if (updateUserDto.mobile) user.mobile = updateUserDto.mobile;
    if (updateUserDto.businessName)
      user.businessName = updateUserDto.businessName;

    // if user.location.coordinates is not set
    if (!user.location.coordinates) {
      if (!updateUserDto.latitude && !updateUserDto.longitude) {
        throw new HttpException(
          'Please provide latitude and longitude',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (updateUserDto.latitude && updateUserDto.longitude) {
      user.location = {
        type: 'Point',
        coordinates: [updateUserDto.longitude, updateUserDto.latitude],
      };
    }

    return await user.save();
  }

  async updateFcm(id: string, fcmToken: string): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { fcmToken },
      { new: true },
    );
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
