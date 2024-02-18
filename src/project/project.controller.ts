import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
  Body,
  Patch,
  UnauthorizedException,
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
import { Role } from 'src/auth/user.role';
import { Roles } from 'src/auth/role.decorator';

@Controller('project')
@ApiTags('Project')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all projects' })
  async getAll(@Request() req) {
    return await this.projectService.getAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  async getOne(@Param('id') id: string) {
    return await this.projectService.findOne(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new project' })
  @ApiBody({ type: CreateProjectDto })
  @Roles(Role.Admin, Role.Client)
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create(createProjectDto);
  }

  @Patch('add_developer')
  @ApiOperation({ summary: 'Add a developer to a project' })
  @ApiBody({ type: UpdateProjectDeveloperDto })
  async addDeveloper(
    @Body() projectDeveloperDto: UpdateProjectDeveloperDto,
    @Request() req,
  ) {
    return await this.projectService.addDeveloper(
      projectDeveloperDto.project_id,
      projectDeveloperDto.developer_id,
      req.user.userId,
    );
  }

  @Patch('remove_developer')
  @ApiOperation({ summary: 'Remove a developer from a project' })
  @ApiBody({ type: UpdateProjectDeveloperDto })
  async removeDeveloper(
    @Body() projectDeveloperDto: UpdateProjectDeveloperDto,
    @Request() req,
  ) {
    return await this.projectService.removeDeveloper(
      projectDeveloperDto.project_id,
      projectDeveloperDto.developer_id,
      req.user.userId,
    );
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiBody({ type: UpdateProjectDto })
  async updateProject(
    @Body() updateProjectDto: UpdateProjectDto,
    @Param('id') id: string,
    @Request() req,
  ) {
    if (req.user.userId !== updateProjectDto.owner) {
      throw new UnauthorizedException();
    }
    return await this.projectService.update(id, updateProjectDto);
  }
}
