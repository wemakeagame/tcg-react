import {
  FilePlusIcon,
  LockClosedIcon,
  PaperPlaneIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export const LoginContainer = () => {
  return (
    <Card>
      <Flex direction={"column"} gap={"2"}>
        <Text size={"3"}>Login</Text>
        <Text size={"1"}>E-mail</Text>
        <TextField.Root placeholder="Enter your e-mail">
          <TextField.Slot>
            <PersonIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Text size={"1"}>Password</Text>
        <TextField.Root placeholder="Enter your password" type="password">
          <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Button>
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
