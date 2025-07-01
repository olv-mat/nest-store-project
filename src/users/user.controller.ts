import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dtos/CreateUser.dto";
import { UpdateUserDTO } from "./dtos/UpdateUser.dto";
import { UserService } from "./user.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    @ApiOperation({ summary: "List registered users" })
    @ApiResponse({ status: 200, description: "Users returned successfully" })
    public async listUsers() {
        return await this.userService.listUsers();
    }

    @Post()
    @ApiOperation({ summary: "Register a user" })
    @ApiResponse({ status: 200, description: "User registered successfully" })
    public async createUser(@Body() request: CreateUserDTO) {
        return await this.userService.createUser(request);
    }

    @Put("/:id")
    @ApiOperation({ summary: "Update a user" })
    @ApiResponse({ status: 200, description: "Users updated successfully" })
    public async updateUser(@Param("id") id: string, @Body() request: UpdateUserDTO) {
        return await this.userService.updateUser(id, request);
    }

    @Delete("/:id")
    @ApiOperation({ summary: "Delete a user" })
    @ApiResponse({ status: 200, description: "Users deleted successfully" })
    public async deleteUser(@Param("id") id: string) {
        return await this.userService.deleteUser(id);
    }

}
