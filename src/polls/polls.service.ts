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

    async getPollById(id: number) {
        const poll = await this.prisma.polls.findFirst({
            where: { id },
            include: {
                options: true
            }
        })

        return poll;
    }

    async createPoll(dto: CreatePollDto) {
        try {
            const createdPoll = await this.prisma.polls.create({
                data: {
                    title: dto.title,
                    category: dto.category,
                    expiry: dto.expiry,
                }
            });

            await this.prisma.option.createMany({
                data: dto.options.map(option => ({
                    name: option.name,
                    votes: option.votes,
                    pollId: createdPoll.id
                }))
            })

            return createdPoll;
        } catch (error) {
            throw new HttpException('Error creating poll', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deletePollById(id: number) {
        try {
            const poll = await this.prisma.polls.findUnique({
                where: { id }
            });

            if (!poll) {
                throw new HttpException('Enquete não encontrada', HttpStatus.NOT_FOUND);
            }
            await this.prisma.polls.delete({
                where: { id }
            });
            return HttpStatus.NO_CONTENT;
        } catch (error) {
            throw new HttpException('Erro ao deletar enquete.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async votePoll(id: number, optionId: number) {
        try {
            const poll = await this.prisma.polls.findUnique({
                where: { id }
            });

            if (!poll) {
                throw new HttpException('Enquete não encontrada', HttpStatus.NOT_FOUND);
            }

            const option = await this.prisma.option.findUnique({
                where: { id: optionId }
            });

            if (!option) {
                throw new HttpException('Opção não encontrada', HttpStatus.NOT_FOUND);
            }

            await this.prisma.option.update({
                where: { id: optionId },
                data: { votes: option.votes + 1 }
            });

            return { message: 'Voto registrado com sucesso' };
        } catch (error) {
            throw new HttpException('Erro ao registrar voto', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async searchPolls(nome?: string, categoria?: string) {
        const where: any = {};

        if (!nome && !categoria) {
            throw new HttpException('Por favor, forneça pelo menos um critério de pesquisa.', HttpStatus.BAD_REQUEST);
        }

        if (nome) {
            where.title = {
                contains: nome,
                mode: 'insensitive'
            };
        }

        if (categoria) {
            where.category = {
                contains: categoria,
                mode: 'insensitive'
            };
        }

        return this.prisma.polls.findMany({
            where,
            include: {
                options: true
            }
        });
    }
}
