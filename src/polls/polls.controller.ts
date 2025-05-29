import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';

@Controller('polls')
export class PollsController {
    
    constructor(private readonly pollsService: PollsService) {}

    @Get()
    getAllPolls() {
        return this.pollsService.getAllPolls();
    }

    @Get(':id')
    getAllPollsId(@Param('id', ParseIntPipe) id: number) {
        return this.pollsService.getPollById(id);
    }

    @Post('create')
    createPoll(@Body() poll: CreatePollDto) {
        return this.pollsService.createPoll(poll);
    }

    @Delete(':id')
    deletePollById(@Param('id', ParseIntPipe) id: number) {
        return this.pollsService.deletePollById(id);
    }

    @Post(':id/vote')
    votePoll(@Param('id', ParseIntPipe) id: number, @Body('optionId', ParseIntPipe) optionId: number) {
        return this.pollsService.votePoll(id, optionId);
    }

    @Post('search')
    searchPolls(@Query('nome') nome?: string, @Query('categoria') categoria?: string) {
        return this.pollsService.searchPolls(nome, categoria);
    }
}

