import {
  Button,
  Callout,
  Card,
  Container,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Page } from "../../core/components/Page";
import { useState } from "react";
import { User } from "../model/user";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

interface ApiResponse<T> {
  data: T | null;
  error?: Error;
}

interface ErrorResponse {
  error: string;
}

const saveUser = async (userData: User): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch("http://localhost:5500/user", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // body data type must match "Content-Type" header
    });

    let data;

    if(response.status !== 200) {
      data = (await response.json()) as ErrorResponse;
      throw Error(data.error);
    } else {
       data = (await response.json()) as User;
    }

    const resolved: ApiResponse<User> = {
      data,
    };

    return resolved;
  } catch (e) {
    const error = e as Error;
    const resolved: ApiResponse<User> = {
      data: null,
      error,
    };

    return resolved;
  }
};

export const UserRegisterPage = () => {
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [rePassword, setRePassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isRegisterDone, setIsRegisterDone] = useState(false);

  const onSubmmit = async () => {
    //TODO move to usePostapi
    console.log(email, username, password, rePassword);

    if (email && username && password && password === rePassword) {
      const user: User = { email, password, username };

      const savedUser: ApiResponse<User> = await saveUser(user);

      if (savedUser.data) {
        setIsRegisterDone(true);
        setErrorMessage(undefined);
      } else {
        setErrorMessage(savedUser.error?.message);
      }
    }
  };

  return (
    <Page>
      <Text size="3" align={"center"} style={{ margin: "15px" }}>
        Please fill up the form for the registration.
      </Text>
      <Flex gap="2">
        <Flex direction={"column"} flexGrow={"1"}>
          <Card>
            <Container size={"1"} maxWidth={"400px"}>
              {!isRegisterDone ? (
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

                  {errorMessage ? (
                    <Callout.Root color="red">
                      <Callout.Icon>
                        <InfoCircledIcon />
                      </Callout.Icon>
                      <Callout.Text>{errorMessage}</Callout.Text>
                    </Callout.Root>
                  ) : null}
                </Flex>
              ) : (
                <Callout.Root color="blue">
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>
                    Your register is done <Link to='/'> Login </Link>
                  </Callout.Text>
                </Callout.Root>
              )}
            </Container>
          </Card>
        </Flex>
      </Flex>
    </Page>
  );
};
