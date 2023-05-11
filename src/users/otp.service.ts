import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Otp } from './otp.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OtpService {
  constructor(@InjectModel('Otp') private readonly otpModel: Model<Otp>) {}

  async findOtp(query: {}): Promise<Otp> {
    return await this.otpModel.findOne(query).exec();
  }

  async generateOtp(): Promise<Otp> {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const newOtp = new this.otpModel();
    newOtp.otp = otp;
    return await newOtp.save();
  }
}
