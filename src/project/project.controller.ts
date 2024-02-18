import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProjectDto } from './Dto/create.dto';
import { UpdateProjectDeveloperDto } from './Dto/update_developers.dto';
import { UpdateProjectDto } from './Dto/update.dto';

@Controller('project')
@ApiTags('Project')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiBearerAuth()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  async getOne(@Param('id') id: string) {
    return await this.projectService.findOne(id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all projects' })
  async getAll(@Request() req) {
    return await this.projectService.getAll(req.user.userId);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new project' })
  @ApiBody({ type: CreateProjectDto })
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create(createProjectDto);
  }

  @Patch('add_developer')
  @ApiOperation({ summary: 'Add a developer to a project' })
  @ApiBody({ type: UpdateProjectDeveloperDto })
  async addDeveloper(@Body() projectDeveloperDto: UpdateProjectDeveloperDto) {
    return await this.projectService.addDeveloper(
      projectDeveloperDto.project_id,
      projectDeveloperDto.developer_id,
    );
  }

  @Patch('remove_developer')
  @ApiOperation({ summary: 'Remove a developer from a project' })
  @ApiBody({ type: UpdateProjectDeveloperDto })
  async removeDeveloper(
    @Body() projectDeveloperDto: UpdateProjectDeveloperDto,
  ) {
    return await this.projectService.removeDeveloper(
      projectDeveloperDto.project_id,
      projectDeveloperDto.developer_id,
    );
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiBody({ type: UpdateProjectDto })
  async updateProject(
    @Body() updateProjectDto: UpdateProjectDto,
    @Param('id') id: string,
  ) {
    return await this.projectService.update(id, updateProjectDto);
  }
}
