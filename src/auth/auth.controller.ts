import { Request, Controller, UseGuards, Body, Post } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto } from './Dto/register.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from './role.decorator';
import { Role } from './user.role';
import { RolesGuard } from './guards/role.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Logs in a user.
   * @param req The request object.
   * @returns The login response.
   */
  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * Creates a new user.
   * @param registerDto The registration data.
   * @returns The registration response.
   */
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 200,
    description: 'Success.',
    schema: {
      type: 'string',
    },
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('register')
  @Roles(Role.Admin)
  async createuser(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
