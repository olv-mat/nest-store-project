import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {

    private users: UserEntity[] = [];

    async select() {
        return this.users;
    }

    async create(user: UserEntity) {
        this.users.push(user);
    }

    async emailAlreadyUsed(email: string) {
        const used = this.users.find(
            user => user.email == email
        );
        return used !== undefined;
    }
}
