import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProjectDeveloperDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  project_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  developer_id: string;
}
