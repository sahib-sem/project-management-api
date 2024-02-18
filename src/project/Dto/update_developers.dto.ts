import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateProjectDeveloperDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  project_id: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  developer_id: string;
}
