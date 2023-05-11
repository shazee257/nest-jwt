import { Controller, Get, Post } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Get()
  getOtp() {
    return 'Hello OTP';
  }

  @Post('/generate')
  generateOtp() {
    return this.otpService.generateOtp();
  }
}
