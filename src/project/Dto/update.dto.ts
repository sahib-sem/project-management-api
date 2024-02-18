import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  @Type(() => Date)
  start_date: Date;

  @IsOptional()
  @IsDate()
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
  @IsString()
  @ApiProperty()
  owner: string;
}
