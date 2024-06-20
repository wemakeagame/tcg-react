import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { Page } from "../../core/components/Page";
import { Timer } from "../../core/components/Timer";
import { useInterval } from "../../core/hooks/useInterval";
import { usePostApi } from "../../core/hooks/useApi";
import { useAuthData } from "../../user/hooks/useAuthData";
import { useEffect, useState } from "react";

export function BattleWaitingPage() {
  const user = useAuthData();
  const navigate = useNavigate();
  const [waitingReponse, setVerifyRequest] = usePostApi<
    { userId: string },
    { message: string }
  >("http://localhost:5500/lobby/verify");
  const [registerResponse, setRegisterBody] = usePostApi<
    { userId: string },
    { message: string }
  >("http://localhost:5500/lobby/register");

  const [unregisterResponse, setUnregisterBody] = usePostApi<
    { userId: string },
    { message: string }
  >("http://localhost:5500/lobby/unregister");
  const [isRegistedInLobby, setIsRegisterInLobby] = useState(false);

  useInterval(2000, () => {
    if (isRegistedInLobby && user?.id) {
      setVerifyRequest({
        userId: user?.id,
      });
    }
  });

  useEffect(() => {
    if (waitingReponse?.data?.message === "connecting") {
      navigate("/lobby-chat");
    }
  }, [waitingReponse]);

  useEffect(() => {
    if (user?.id) {
      setRegisterBody({
        userId: user.id,
      });
    }
  }, []);

  useEffect(() => {
    if (registerResponse?.data?.message === "registered") {
      setIsRegisterInLobby(true);
    }
  }, [registerResponse]);

  const unregisterUser = () => {
    if (user?.id) {
      setUnregisterBody({ userId: user.id });
    }
  };

  useEffect(() => {
    if (unregisterResponse?.data?.message === "unregistered") {
      navigate("/user");
    }
  }, [unregisterResponse]);

  return (
    <Page>
      <Flex justify="center">
        <Card>
          <Flex direction="column" align="center">
            <Flex style={{ alignSelf: "end" }}>
              <Button onClick={() => unregisterUser()}>Back</Button>
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
