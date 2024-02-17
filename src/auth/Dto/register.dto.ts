import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  role: string;

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
  email: string;
}
