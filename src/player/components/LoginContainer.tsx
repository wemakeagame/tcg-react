import {
  FilePlusIcon,
  LockClosedIcon,
  PaperPlaneIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

export const LoginContainer = () => {
  const { login } = useContext(UserContext);

  const [usernameEmail, setUsernameEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const submit = () => {
    // chamar a api
    //registrar o login
    console.log(usernameEmail, password);
  };

  return (
    <Card>
      <Flex direction={"column"} gap={"2"}>
        <Text size={"3"}>Login</Text>
        <Text size={"1"}>Username or E-mail</Text>
        <TextField.Root
          placeholder="Enter your username or e-mail"
          value={usernameEmail}
          onChange={(e) => setUsernameEmail(e.target.value)}
        >
          <TextField.Slot>
            <PersonIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Text size={"1"}>Password</Text>
        <TextField.Root placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}>
          <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Button onClick={() => submit()}>
          <PaperPlaneIcon /> Log-in
        </Button>

        <Button variant="surface">
          <Link to={`/register`}>
            <FilePlusIcon /> Register
          </Link>
        </Button>
      </Flex>
    </Card>
  );
};
