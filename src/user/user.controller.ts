import {
  Body,
  Controller,
  Patch,
  UseGuards,
  Request,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from 'src/auth/Dto/update_user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class userController {
  constructor(private userService: UserService) {}

  /**
   * Updates an user user.
   * @param updateuser The updated user data.
   * @param req The request object.
   * @param id The ID of the user to update.
   * @throws UnauthorizedException if the authenticated user is not authorized to update the user.
   */
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @Patch('update/:id')
  async update_user(
    @Body() updateUser: UpdateUserDto,
    @Request() req,
    @Param('id') id: string,
  ) {
    if (req.user.userId !== id) {
      throw new UnauthorizedException();
    }

    return await this.userService.updateuser(id, updateUser);
  }
}
