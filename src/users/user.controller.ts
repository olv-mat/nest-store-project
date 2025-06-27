import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dtos/CreateUser.dto";

@Controller("users")
export class UserController {

    constructor(private userRepository:UserRepository) {}

    @Get()
    async selectUsers() {
        return this.userRepository.select();
    }

    @Post()
    async createUser(@Body() userData: CreateUserDTO) {

        this.userRepository.create(userData);

        return {
            user: userData,
        }
    }

}
