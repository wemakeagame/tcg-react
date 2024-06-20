

export interface User {
    id: string;
    username: string;
    password?: string;
    email: string;
}

export class UserRepository {
    currentId = 2;
    data: User[] = [
        {
            username: 'player1',
            email: 'player1@tcg.com',
            id: '1',
            password: '123',
        },
        {
            username: 'player2',
            email: 'player2@tcg.com',
            id: '2',
            password: '123',
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