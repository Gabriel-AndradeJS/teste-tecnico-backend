import { IsNotEmpty, IsString } from "class-validator";
import { CreateOptionDto } from "./create-option.dto";


export class CreatePollDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString({ each: true })
    @IsNotEmpty()
    options: CreateOptionDto[];

    @IsString()
    expiry: string;

}