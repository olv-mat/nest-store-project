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
}
