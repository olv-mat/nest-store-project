import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {

    private users: UserEntity[] = [];

    async select() {
        return this.users;
    }

    async create(user:UserEntity) {
        this.users.push(user);
    }

    async update(id:string, data:Partial<UserEntity>) {
        const possibleUser = this.users.find(
            user => user.id === id
        );

        if (!possibleUser) {
            throw new Error("User Not Found");
        }

        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                possibleUser[key] = value;
            }
        });

        return possibleUser;
    }

    async emailAlreadyUsed(email: string) {
        const used = this.users.find(
            user => user.email == email
        );
        return used !== undefined;
    }
}
