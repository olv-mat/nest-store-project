import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { UniqueEmail } from "../validators/unique-email.validator";

export class UpdateUserDTO {

    @IsOptional()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsEmail()
    @UniqueEmail({ message: "email already used" })
    email: string;

    @IsOptional()
    @MinLength(6)
    password: string;
}
