import { IsString, IsEmail, IsOptional } from 'class-validator';

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
