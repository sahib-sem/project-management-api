import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { DeveloperModule } from './developer/developer.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ClientModule,
    DeveloperModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
