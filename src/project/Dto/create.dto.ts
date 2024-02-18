import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  @Type(() => Date)
  start_date: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty()
  end_date: Date;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  @ApiProperty()
  progress: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  owner: string;

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty()
  developers: string[];
}
