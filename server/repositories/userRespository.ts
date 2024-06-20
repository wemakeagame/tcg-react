

export interface User {
    id: string;
    username: string;
    password?: string;
    email: string;
}

export class UserRepository {
    currentId = 1;
    data: User[] = [
        {
            username: 'admin',
            email: 'admin@admin.com',
            id: '1',
            password: 'admin',
        }
    ]

    public getUser(username?: string, email?: string) : User | undefined {
        if(username) {
            return this.data.find(user => user.username === username)
        }
        else {
            return this.data.find(user => user.email === email)
        }
    }


    public addUser(user: User): User {
        if(!this.getUser(user.username) && !this.getUser(undefined, user.email)) {
            this.currentId++;
            user.id = this.currentId.toString();
            this.data.push(user);
            return user;
        }

        throw new Error('User already exist');

    }
}