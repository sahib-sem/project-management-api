import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  @Type(() => Date)
  start_date: Date;

  @IsDateString()
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

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  owner: string;

  @IsUUID(undefined, { each: true })
  @IsOptional()
  @ApiProperty()
  developers: string[];
}
