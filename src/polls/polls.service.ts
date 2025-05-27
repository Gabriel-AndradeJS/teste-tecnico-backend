import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePollDto } from './dto/create-poll.dto';

@Injectable()
export class PollsService {

    constructor(private prisma: PrismaService) { }

    async getAllPolls() {
        return this.prisma.polls.findMany({
            include: {
                options: true
            }
        });
    }

    async createPoll(dto: CreatePollDto) {
        try {
            const createdPoll = await this.prisma.polls.create({
                data: {
                    title: dto.title,
                    expiry: dto.expiry,
                }
            });

            await this.prisma.option.createMany({
                data: dto.options.map(option => ({
                    name: option.name,
                    pollId: createdPoll.id
                }))
            })

            return createdPoll;
        } catch (error) {
            throw new HttpException('Error creating poll', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
