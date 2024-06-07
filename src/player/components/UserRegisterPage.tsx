import {
  Button,
  Card,
  Container,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Page } from "../../core/components/Page";
import { useState } from "react";
import { User } from "../model/user";

const saveUser = async (userData: User) => {
  try {
    const response = await fetch('http://localhost:5500/user', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  } catch (e) {
    console.error(e);
  }
}

export const UserRegisterPage = () => {
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [rePassword, setRePassword] = useState<string>();

  const onSubmmit = () => {
    // valida e manda informacao para o back end
    console.log(email, username, password, rePassword);

    if(email && username && password && (password === rePassword)) {
      const user: User = {email, password, username};

      saveUser(user);
    }

    //Rest api
    // get, post, put, patch, delete
  }

  return (
    <Page>
      <Text size="3" align={"center"} style={{ margin: "15px" }}>
        Please fill up the form for the registration.
      </Text>
      <Flex gap="2">
        <Flex direction={"column"} flexGrow={"1"}>
          <Card>
            <Container size={"1"} maxWidth={"400px"}>
              <Flex direction={"column"} gap={"2"}>
                <Text size="3"> Register</Text>
                <div>
                  <Text size={"1"}>E-mail</Text>
                  <TextField.Root
                    placeholder="Enter your e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  >
                    <TextField.Slot></TextField.Slot>
                  </TextField.Root>
                </div>
                <div>
                  <Text size={"1"}>Username</Text>
                  <TextField.Root
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  >
                    <TextField.Slot></TextField.Slot>
                  </TextField.Root>
                </div>
                <div>
                  <Text size={"1"}>Password</Text>
                  <TextField.Root
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  >
                    <TextField.Slot></TextField.Slot>
                  </TextField.Root>
                </div>
                <div>
                  <Text size={"1"}>Repeat Password</Text>
                  <TextField.Root
                    placeholder="Enter your password once more"
                    type="password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                  >
                    <TextField.Slot></TextField.Slot>
                  </TextField.Root>
                </div>

                <Button onClick={onSubmmit}>Submit</Button>
              </Flex>
            </Container>
          </Card>
        </Flex>
      </Flex>
    </Page>
  );
};

// username, email, password
