import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Max,
  Min,
  IsNumber,
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

  @IsString()
  @IsNotEmpty()
  role: string;
}

// update user dto
export class UpdateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  businessName: string;

  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  dob: Date;

  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}
