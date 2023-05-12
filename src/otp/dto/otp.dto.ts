import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class createOtpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class verifyOtpDto {
  @IsNotEmpty()
  @IsNumber()
  otp: number;
}
