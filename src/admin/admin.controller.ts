import {
  Body,
  Controller,
  Patch,
  UseGuards,
  Request,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/auth/Dto/update_user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  /**
   * Updates an admin user.
   * @param updateAdmin The updated user data.
   * @param req The request object.
   * @param id The ID of the user to update.
   * @throws UnauthorizedException if the authenticated user is not authorized to update the user.
   */
  @ApiOperation({ summary: 'Update admin' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async updateAdmin(
    @Body() updateAdmin: UpdateUserDto,
    @Request() req,
    @Param('id') id: string,
  ) {
    console.log(id, req.user);
    if (req.user.userId !== id) {
      throw new UnauthorizedException();
    }

    await this.adminService.updateAdmin(id, updateAdmin);
  }
}
