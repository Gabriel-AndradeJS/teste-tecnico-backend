import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';

@Controller('polls')
export class PollsController {
    
    constructor(private readonly pollsService: PollsService) {}

    @Get()
    getAllPolls() {
        return this.pollsService.getAllPolls();
    }

    @Post('create')
    createPoll(@Body() poll: CreatePollDto) {
        return this.pollsService.createPoll(poll);
    }
}
