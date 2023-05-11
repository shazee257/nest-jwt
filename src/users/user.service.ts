import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, Location } from './user.model';
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
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (error) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
  }

  async findUser(query: {}): Promise<User> {
    try {
      return await this.userModel.findOne(query).exec();
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
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
    newUser.fcmToken = createUserDto.fcmToken;

    return await newUser.save();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const obj: any = {
      ...updateUserDto,
      location: {
        type: 'Point',
        coordinates: [updateUserDto.longitude, updateUserDto.latitude],
      },
    };

    const updatedUser = await this.userModel.findByIdAndUpdate(id, obj, {
      new: true,
    });

    return updatedUser;
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

  async uploadImage(id: string, filename: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.image = 'users/' + filename;
    return await user.save();
  }
}
