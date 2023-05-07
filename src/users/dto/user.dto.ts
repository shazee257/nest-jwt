import { IsString, IsEmail, IsOptional, isEmail } from 'class-validator';

// create user dto
export class CreateUserDto {
  @IsOptional()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
}
