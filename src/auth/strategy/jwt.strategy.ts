import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstant } from '../constant';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstant.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.username);
    return {
      userId: payload.sub,
      username: payload.username,
      role: user.role,
      name: user.name,
    };
  }
}
