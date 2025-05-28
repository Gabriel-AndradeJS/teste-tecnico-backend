import { IsNotEmpty, IsString } from "class-validator";
import { CreateOptionDto } from "./create-option.dto";


export class CreatePollDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString({ each: true })
    @IsNotEmpty()
    options: CreateOptionDto[];

    @IsString()
    @IsNotEmpty()
    expiry: string;

}