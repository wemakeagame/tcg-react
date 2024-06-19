import { Page } from "../../core/components/Page";
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { Timer } from "../../core/components/Timer";

export const BattleWaitingPage = () => {
 

  return (
    <Page>
      <Flex justify={"center"}>
        <Card>
        <Flex direction={'column'} align={'center'}>
          <Flex style={{alignSelf: 'end'}}><Link to="/user"><Button>Back</Button></Link></Flex>
          <Text size={"6"} weight={"bold"}>
            Waiting for server to find you an oponent!
          </Text>
          <Timer interval={1000} initialDate={new Date()}></Timer>
          </Flex>
        </Card>
      </Flex>
    </Page>
  );
};
