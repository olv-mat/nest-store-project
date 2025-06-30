import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dtos/CreateUser.dto";
import { ListUserDTO } from "./dtos/ListUser.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";
import { UpdateUserDTO } from "./dtos/UpdateUser.dto";

@Controller("users")
export class UserController {

    constructor(private userRepository:UserRepository) {}

    @Get()
    async selectUsers() {

        const savedUsers = await this.userRepository.select();
        const users = savedUsers.map(
            user => new ListUserDTO(
                user.id,
                user.name
            )
        );
        return users;
    }

    @Post()
    async createUser(@Body() userData: CreateUserDTO) {

        const userEntity = new UserEntity();

        userEntity.id = uuid();
        userEntity.name = userData.name;
        userEntity.email = userData.email;
        userEntity.password = userData.password;

        this.userRepository.create(userEntity);

        return {
            user: new ListUserDTO(
                userEntity.id,
                userEntity.name
            ),
            message: "user created successfully"
        }
    }

    @Put("/:id")
    async updateUser(@Param("id") id:string, @Body() request:UpdateUserDTO) {
        const userUpdated = await this.userRepository.update(id, request);
        return {
            user: new ListUserDTO(
                userUpdated.id,
                userUpdated.name
            ),
            message: "user updated successfully"
        }
    }

}
