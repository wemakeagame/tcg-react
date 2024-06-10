import UserContext from "../../player/UserContext";
import { User } from "../../player/model/user";
import "./App.css";
import { PropsWithChildren, useState } from "react";

export const App: React.FC<PropsWithChildren> = ({ children }) => {
  const savedUserString = sessionStorage.getItem("user");
  let savedUser;

  if (savedUserString) {
    savedUser = JSON.parse(savedUserString) as User;
  }
  const [user, setUser] = useState<User | undefined>(savedUser);

  const login = (user: User) => {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(undefined);
    sessionStorage.removeItem("user");
  };

  return (
    <>
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export default App;
