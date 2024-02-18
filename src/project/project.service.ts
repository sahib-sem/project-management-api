import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './schema/project.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './Dto/create.dto';
import { UpdateProjectDto } from './Dto/update.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,

    private userService: UserService,
  ) {}

  async findOne(project_id: string): Promise<Project> {
    const project = (await this.projectModel.findById(project_id)).populate(
      'owner',
      '-password',
    );
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async getAll(user_id: string): Promise<Project[]> {
    return await this.projectModel
      .find({ owner: user_id })
      .populate('owner', '-password')
      .exec();
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const user = await this.userService.findOneById(createProjectDto.owner);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const createdProject = new this.projectModel(createProjectDto);

    return await createdProject.save();
  }

  async addDeveloper(
    project_id: string,
    developer_id: string,
  ): Promise<boolean> {
    const project = await this.projectModel.findById(project_id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const user = await this.userService.findOneById(developer_id);
    if (!user || user.role !== 'developer') {
      return false;
    }

    if (!project.developers.includes(developer_id)) {
      project.developers.push(developer_id);
      await project.save();
      return true;
    }

    return false;
  }

  async removeDeveloper(
    project_id: string,
    developer_id: string,
  ): Promise<boolean> {
    const project = await this.projectModel.findById(project_id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const index = project.developers.indexOf(developer_id);
    if (index !== -1) {
      project.developers.splice(index, 1);
      await project.save();
      return true;
    }

    return false;
  }

  async update(
    project_id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectModel.findById(project_id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (updateProjectDto.owner) {
      const user = await this.userService.findOneById(updateProjectDto.owner);
      if (!user) {
        throw new NotFoundException('user not found');
      }
    }

    Object.keys(updateProjectDto).forEach((key) => {
      if (key in project) {
        project[key] = updateProjectDto[key];
      }
    });

    return await project.save();
  }
}
