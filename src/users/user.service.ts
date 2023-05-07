import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/user.dto';
import { hashPassword } from 'src/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  findById(id: string): any {
    return this.userModel.findById(id);
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
}
