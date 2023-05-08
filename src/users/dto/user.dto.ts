import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Matches,
} from 'class-validator';

// create user dto
export class CreateUserDto {
  @IsOptional()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsString()
  // @IsNotEmpty()
  // confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

// update user dto
export class UpdateUserDto {
  @IsOptional()
  fullName: string;

  @IsOptional()
  mobile: string;

  @IsOptional()
  businessName: string;

  @IsOptional()
  latitude: number;

  @IsOptional()
  longitude: number;
}
