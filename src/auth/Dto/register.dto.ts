import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Role } from '../user.role';
import { IsValidRole } from './valid_role';

export class RegisterDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  @IsValidRole()
  role: Role;

  @IsString()
  @ApiProperty()
  contact_info: string;

  @IsString()
  @MinLength(5)
  @ApiProperty()
  password: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty()
  username: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  email: string;
}
