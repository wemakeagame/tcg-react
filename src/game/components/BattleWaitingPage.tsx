import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { Page } from "../../core/components/Page";
import { Timer } from "../../core/components/Timer";
import { useInterval } from "../../core/hooks/useInterval";
import { usePostApi } from "../../core/hooks/useApi";
import { useAuthData } from "../../user/hooks/useAuthData";
import { useEffect, useState } from "react";

export function BattleWaitingPage() {
  const userId = useAuthData();
  const [waitingReponse, setVerifyRequest] = usePostApi<{ userId: string }, {message: string}>(
    "http://localhost:5500/lobby/verify"
  );
  const [registerResponse, setRegisterBody] = usePostApi<{ userId: string }, {message: string}>(
    "http://localhost:5500/lobby/register"
  );
  const [isRegistedInLobby, setIsRegisterInLobby] = useState(false);

  useInterval(2000, () => {
    if (isRegistedInLobby && userId) {
      setVerifyRequest({
        userId,
      });
    }
  });

  useEffect(() => {
    console.log(waitingReponse);
  }, [waitingReponse]);

  useEffect(() => {
    if(userId) {
      setRegisterBody({
        userId,
      });
    }
  }, []);

  useEffect(() => {
    if (registerResponse?.data?.message === "registered") {
      setIsRegisterInLobby(true);
    }
  }, [registerResponse]);

  return (
    <Page>
      <Flex justify="center">
        <Card>
          <Flex direction="column" align="center">
            <Flex style={{ alignSelf: "end" }}>
              <Link to="/user">
                <Button>Back</Button>
              </Link>
            </Flex>
            <Text size="6" weight="bold">
              Waiting for server to find you an oponent!
            </Text>
            <Timer interval={1000} initialDate={new Date()} />
          </Flex>
        </Card>
      </Flex>
    </Page>
  );
}
