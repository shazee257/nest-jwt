import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpService } from './otp.service';
import { OtpSchema } from './model/otp.model';
import { OtpController } from '../otp/otp.controller';
import { UserModule } from 'src/users/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Otp', schema: OtpSchema }]),
    UserModule,
    AuthModule,
  ],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [],
})
export class OtpModule {}
