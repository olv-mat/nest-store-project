import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {

    private users: UserEntity[] = [];

    public select() {
        return this.users;
    }

    public create(user: UserEntity) {
        this.users.push(user);
    }

    public update(id: string, data: Partial<UserEntity>) {

        const user = this.selectById(id);
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) {
                user[key] = value;
            }
        });
        return user;
    }

    public delete(id: string) {

        const user = this.selectById(id);
        this.users = this.users.filter(
            storedUser => storedUser.id !== id
        );
        return user;
    }

    public selectByEmail(email: string) {

        const possibleUser = this.users.find(
            user => user.email == email
        );
        return possibleUser;
    }

    private selectById(id: string) {

        const possibleUser = this.users.find(
            user => user.id === id
        );

        if (!possibleUser) {
            throw new Error("User Not Found");
        }

        return possibleUser;
    }

}
