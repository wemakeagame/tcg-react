/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { Page } from "../../core/components/Page";
import { Timer } from "../../core/components/Timer";
import { useInterval } from "../../core/hooks/useInterval";
import { usePostApi } from "../../core/hooks/useApi";
import { useAuthData } from "../../user/hooks/useAuthData";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function LobbyChatPage() {
  const user = useAuthData();
  const navigate = useNavigate();
  const [matchResponse, setVerifyRequest] = usePostApi<{ userId: string }, ({ chat?: string[], message?: string })>(
    "http://localhost:5500/match/verify"
  );

  useInterval(2000, () => {
    if (user?.id) {
      setVerifyRequest({
        userId: user?.id,
      });
    }
  });

  useEffect(() => {
    if (matchResponse?.data?.message === "disconnected") {
      toast("Disconnected");
      navigate("/waiting-battle");
    }
  }, [matchResponse]);


  return (
    <Page>
      <Flex justify="center">
        <Card>
          <Flex direction="column" align="center">
            <Text size="6" weight="bold">
              You should have a chat here
              <>{JSON.stringify(matchResponse?.data)}</>
            </Text>
          </Flex>
        </Card>
      </Flex>
    </Page>
  );
}
