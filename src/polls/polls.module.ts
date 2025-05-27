import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PollsService, PrismaService],
  controllers: [PollsController],
  imports: [],
})
export class PollsModule {}
