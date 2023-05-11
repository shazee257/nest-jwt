import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { UserController } from './user.controller';
import { OtpService } from './otp.service';
import { OtpSchema } from './otp.model';
import { OtpController } from './otp.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Otp', schema: OtpSchema },
    ]),
  ],
  controllers: [UserController, OtpController],
  providers: [UserService, OtpService],
  exports: [UserService],
})
export class UserModule {}
