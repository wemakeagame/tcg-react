import { createContext } from 'react';
import { User } from './model/user';

type UserContextType =  {
    user?: User,
    login?: (user: User) => void,
    logout?: () => void
}

const UserContext = createContext<UserContextType>({
    user: undefined,
});
export default UserContext;