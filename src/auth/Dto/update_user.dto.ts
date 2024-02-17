import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty()
  @IsOptional()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  contact_info: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  email: string;
}
