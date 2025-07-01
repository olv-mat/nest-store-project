import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { ListUserDTO } from "./dtos/ListUser.dto";
import { UpdateUserDTO } from "./dtos/UpdateUser.dto";
import { CreateUserDTO } from "./dtos/CreateUser.dto";

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    public async listUsers() {
        const savedUsers = await this.userRepository.find();
        const usersList = savedUsers.map(
            user => new ListUserDTO(
                user.id,
                user.name
            )
        );
        return {
            users: usersList
        };
    }

    public async createUser(userDTO: CreateUserDTO) {

        const userEntity = new UserEntity();
        userEntity.name = userDTO.name;
        userEntity.email = userDTO.email;
        userEntity.password = userDTO.password;

        await this.userRepository.save(userEntity);
    
        return {
            message: "user created successfully"
        }  
    }

    public async updateUser(id: string, userEntity: UpdateUserDTO) {
        await this.userRepository.update(id, userEntity);
        return {
            message: "user updated successfully"
        }  
    }

    public async deleteUser(id: string) {
        await this.userRepository.delete(id);
        return {
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
