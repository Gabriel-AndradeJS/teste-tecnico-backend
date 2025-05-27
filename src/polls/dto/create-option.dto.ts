import { IsNumber, IsString } from "class-validator";

export class CreateOptionDto {

    @IsString()
    name: string;

    @IsNumber()
    votes: number;

    @IsNumber()
    pollId: number;
}