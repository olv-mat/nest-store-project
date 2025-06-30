import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dtos/CreateUser.dto";
import { ListUserDTO } from "./dtos/ListUser.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";
import { UpdateUserDTO } from "./dtos/UpdateUser.dto";

@Controller("users")
export class UserController {

    constructor(private userRepository: UserRepository) { }

    @Get()
    public async selectUsers() {

        const storedUsers = this.userRepository.select();
        const users = storedUsers.map(
            storedUser => new ListUserDTO(
                storedUser.id,
                storedUser.name
            )
        );
        return users;
    }

    @Post()
    public async createUser(@Body() request: CreateUserDTO) {

        const userEntity = new UserEntity();

        userEntity.id = uuid();
        userEntity.name = request.name;
        userEntity.email = request.email;
        userEntity.password = request.password;

        this.userRepository.create(userEntity);

        return {
            user: this.instanceListUserDTO(userEntity),
            message: "user created successfully"
        }
    }

    @Put("/:id")
    public async updateUser(@Param("id") id: string, @Body() request: UpdateUserDTO) {
        const updatedUser = this.userRepository.update(id, request);
        return {
            user: this.instanceListUserDTO(updatedUser),
            message: "user updated successfully"
        }
    }

    @Delete("/:id")
    public async deleteUser(@Param("id") id: string) {
        const deletedUser = this.userRepository.delete(id);
        return {
            user: this.instanceListUserDTO(deletedUser),
            message: "user deleted successfully"
        }
    }

    private instanceListUserDTO(entity: UserEntity) {
        return new ListUserDTO(
            entity.id,
            entity.name
        );
    }

}
