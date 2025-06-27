export class UserRepository {
    private users: any[] = [];

    async save(user) {
        this.users.push(user);
        console.log(this.users);
    }
}
