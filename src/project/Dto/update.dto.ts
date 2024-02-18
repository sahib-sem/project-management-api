import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  @Type(() => Date)
  start_date: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  @Type(() => Date)
  end_date: Date;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty()
  progress: number;

  @IsOptional()
  @IsUUID()
  @ApiProperty()
  owner: string;
}
