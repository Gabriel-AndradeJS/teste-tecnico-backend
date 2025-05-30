import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PollsModule } from './polls/polls.module';

@Module({
  imports: [PrismaModule, PollsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
