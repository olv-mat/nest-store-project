import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {

    private users: any[] = [];

    async select() {
        return {
           users: this.users
        };
    }

    async create(user) {
        this.users.push(user);
    }

    async emailAlreadyUsed(email: string) {
        const used = this.users.find(
            user => user.email == email
        );
        return used !== undefined;
    }
}
