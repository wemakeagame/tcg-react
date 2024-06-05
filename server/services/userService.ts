import { User, UserRepository } from "../repositories/userRespository";

export interface UserCredential {
    username?: string;
    password: string;
    email?: string;
}

export class UserService {
    userRepository: UserRepository = new UserRepository();

    public authenticateUser(credential : UserCredential): boolean {
        if(credential.email || credential.username) {
            const user = this.userRepository.getUser(credential.username, credential.email);

            return user?.password === credential.password;
        }
        return false;
    }


    public addUser(user: User): boolean {
        return this.userRepository.addUser(user);
    }

    public getUser(username: string, email?: string): User | undefined {
        return this.userRepository.getUser(username, email);
    }
}