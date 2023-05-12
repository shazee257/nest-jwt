import { Body, Controller, Post, Put } from '@nestjs/common';
import { OtpService } from './otp.service';
import { createOtpDto, verifyOtpDto } from './dto/otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('/send')
  sendOtp(@Body() createOtpDto: createOtpDto) {
    return this.otpService.sendOtp(createOtpDto);
  }

  @Put('/verify')
  verifyOtp(@Body() verifyOtpDto: verifyOtpDto) {
    return this.otpService.verifyOtp(verifyOtpDto);
  }
}
