import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Otp } from './model/otp.model';
import { InjectModel } from '@nestjs/mongoose';
import { createOtpDto, verifyOtpDto } from './dto/otp.dto';
import { UserService } from 'src/users/user.service';
import { generateRandomOTP, otpExpiry } from 'src/utils';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel('Otp') private readonly otpModel: Model<Otp>,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async deleteOtps(query: {}): Promise<any> {
    try {
      return await this.otpModel.deleteMany(query).exec();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async sendOtp(createOtpDto: createOtpDto): Promise<Otp> {
    const user = await this.userService.findUser({ email: createOtpDto.email });
    if (!user) throw new HttpException('User not found', 404);

    // delete all previous otps
    await this.deleteOtps({ email: createOtpDto.email });

    const newOtp = new this.otpModel();
    newOtp.email = createOtpDto.email;
    newOtp.otp = generateRandomOTP();
    return await newOtp.save();
  }

  async verifyOtp(verifyOtpDto: verifyOtpDto): Promise<any> {
    const otp = await this.otpModel.findOne({ otp: verifyOtpDto.otp });
    if (!otp) throw new HttpException('Invalid OTP', 400);

    const user = await this.userService.findUser({ email: otp.email });
    if (!user) throw new HttpException('User not found', 404);

    const isOtpExpired = otpExpiry(otp.createdAt);
    if (isOtpExpired) throw new HttpException('OTP expired', 400);

    const updatedUser = await this.userService.updateUserByQuery(
      { email: otp.email },
      { isVerified: true },
    );

    const token = this.authService.generateToken(user);

    // delete all previous otps
    // await this.deleteOtps({ email: otp.email });

    return { token, user: updatedUser };
  }
}
