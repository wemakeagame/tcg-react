import { Button, Card, Container, Flex, Text, TextField } from "@radix-ui/themes";
import { Page } from "../../core/components/Page";

export const UserRegisterPage = () => {
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
                  <TextField.Root placeholder="Enter your e-mail">
                    <TextField.Slot></TextField.Slot>
                  </TextField.Root>
                </div>
                <div>
                  <Text size={"1"}>Username</Text>
                  <TextField.Root placeholder="Enter your username">
                    <TextField.Slot></TextField.Slot>
                  </TextField.Root>
                </div>
                <div>
                  <Text size={"1"}>Password</Text>
                  <TextField.Root placeholder="Enter your password" type='password'>
                    <TextField.Slot></TextField.Slot>
                  </TextField.Root>
                </div>
                <div>
                  <Text size={"1"}>Repeat Password</Text>
                  <TextField.Root placeholder="Enter your password once more" type='password'>
                    <TextField.Slot></TextField.Slot>
                  </TextField.Root>
                </div>

                <Button>Submit</Button>
              </Flex>
            </Container>
          </Card>
        </Flex>
      </Flex>
    </Page>
  );
};

// username, email, password
