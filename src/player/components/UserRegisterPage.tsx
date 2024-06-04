import {  Card, Flex, Text } from "@radix-ui/themes";
import { Page } from "../../core/components/Page";

export const UserRegisterPage = () => {
  return (
    <Page>
      <Text size="3" align={"center"} style={{ margin: "15px" }}>
       Please fill up the form for the registration.
      </Text>
      <Flex gap="2">
        <Card>
            <Text size="3"> Register</Text>
        </Card>
      </Flex>
    </Page>
  );
};
