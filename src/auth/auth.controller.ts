import { Request, Controller, UseGuards, Body, Post } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto } from './Dto/register.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from './role.decorator';
import { Role } from './user.role';
import { RolesGuard } from './guards/role.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('register')
  @ApiResponse({ status: 200, description: 'Success.' })
  @Roles(Role.Admin)
  async createAdmin(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
