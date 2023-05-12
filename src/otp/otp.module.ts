import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpService } from './otp.service';
import { OtpSchema } from './otp.model';
import { OtpController } from '../otp/otp.controller';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Otp', schema: OtpSchema }]),
    UserModule,
  ],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [],
})
export class OtpModule {}
