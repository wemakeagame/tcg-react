import { Link } from "react-router-dom";
import { Page } from "./Page";
import { Text, Flex } from "@radix-ui/themes";

export const NonAuthorized = () => {
  return (
    <Page>
      <Flex justify={"center"} align={"center"} direction={"column"}>
        <Text size={"6"}>You are not able to see this page</Text>

        <p>
          <Link to="/">Login</Link>
        </p>
      </Flex>
    </Page>
  );
};
