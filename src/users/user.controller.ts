import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dtos/CreateUser.dto";
import { UpdateUserDTO } from "./dtos/UpdateUser.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    public async listUsers() {
        return await this.userService.listUsers();
    }

    @Post()
    public async createUser(@Body() request: CreateUserDTO) {
        return await this.userService.createUser(request);
    }

    @Put("/:id")
    public async updateUser(@Param("id") id: string, @Body() request: UpdateUserDTO) {
        return await this.userService.updateUser(id, request);
    }

    @Delete("/:id")
    public async deleteUser(@Param("id") id: string) {
        return await this.userService.deleteUser(id);
    }

}
