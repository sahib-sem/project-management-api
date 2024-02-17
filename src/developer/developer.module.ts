import { Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Developer, DeveloperSchema } from './schema/developer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Developer.name, schema: DeveloperSchema },
    ]),
  ],
  controllers: [DeveloperController],
  providers: [DeveloperService],
  exports: [DeveloperService],
})
export class DeveloperModule {}
