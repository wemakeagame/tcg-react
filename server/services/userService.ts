import { User, UserRepository } from "../repositories/userRespository";

export interface UserCredential {
    usernameEmail: string;
    password: string;
}

export class UserService {
    userRepository: UserRepository = new UserRepository();

    public authenticateUser(credential : UserCredential): User | null {
        if(credential.usernameEmail) {
            const user = this.userRepository.getUser(credential.usernameEmail, credential.usernameEmail);

            return user?.password === credential.password ? user : null;
        }
        return null;
    }


    public addUser(user: User): User {
        return this.userRepository.addUser(user);
    }

    public getUser(username: string, email?: string): User | undefined {
        return this.userRepository.getUser(username, email);
    }
}