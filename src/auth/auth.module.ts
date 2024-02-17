import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './constant';
import { JwtStrategy } from './strategy/jwt.strategy';
import { DeveloperModule } from 'src/developer/developer.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [
    AdminModule,
    DeveloperModule,
    ClientModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
