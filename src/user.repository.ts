export class UserRepository {
    private users: any[] = [];

    async select() {
        return this.users;
    }

    async create(user) {
        this.users.push(user);
    }
}
