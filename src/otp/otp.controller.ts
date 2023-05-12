import { Body, Controller, Get, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { createOtpDto, verifyOtpDto } from './dto/otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Get()
  getOtp() {
    return 'Hello OTP';
  }

  @Post('/send')
  sendOtp(@Body() createOtpDto: createOtpDto) {
    return this.otpService.sendOtp(createOtpDto);
  }

  @Post('/verify')
  verifyOtp(@Body() verifyOtpDto: verifyOtpDto) {
    return this.otpService.verifyOtp(verifyOtpDto);
  }
}
