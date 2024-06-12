import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { Page } from "../../core/components/Page";
import { useAuthData } from "../hooks/useAuthData";

export const UserLandingPage = () => {
  const userId = useAuthData();

  return (
    <Page>
      <Flex justify={"end"} style={{padding: '10px'}}>
        <Button>Rules and Tutorial</Button>
      </Flex>
      <Flex gap={"3"} justify={"center"}>
        <Card style={{flexGrow: 1}}>
          <Flex gap={"3"} direction={"column"}>
            <Text align={"left"} size={"3"}>
              Game
            </Text>
            <Button> Play </Button>
            <Text align={"center"}>Start play to unlok new cards.</Text>
          </Flex>
        </Card>
        <Card style={{flexGrow: 1}}>
          <Flex gap={"3"} direction={"column"}>
            <Text align={"left"} size={"3"}>
              Cards
            </Text>
            <Button> Manage Deck </Button>
            <Text align={"center"}>Add or remove cards on your deck</Text>
          </Flex>
        </Card>
      </Flex>
      <Flex>
        <Card style={{flexGrow:1, margin: '15px'}}>
            <Flex direction={'row'} justify={'center'} gap={'2'}>
            <p><strong>Matches:</strong> 99 -</p>
            <p><strong>Won:</strong> 99 -</p>
            <p><strong>Lost:</strong> 99 - </p>
            <p><strong>Ranking Position:</strong> 99</p>
            </Flex>
        </Card>
      </Flex>
    </Page>
  );
};
