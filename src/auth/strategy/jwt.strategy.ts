import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstant } from '../constant';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstant.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.adminService.findOne(payload.username);
    return { userId: payload.sub, username: payload.username, role: user.role };
  }
}
