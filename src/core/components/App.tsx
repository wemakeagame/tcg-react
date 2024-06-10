import UserContext from "../../player/UserContext";
import { User } from "../../player/model/user";
import "./App.css";
import { PropsWithChildren, useState } from "react";

export const App: React.FC<PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState<User>();

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(undefined);
  };
  
  return (
     <>
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
     </>
  );
}

export default App;
