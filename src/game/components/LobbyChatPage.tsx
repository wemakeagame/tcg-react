/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { Page } from "../../core/components/Page";
import { Timer } from "../../core/components/Timer";
import { useInterval } from "../../core/hooks/useInterval";
import { usePostApi } from "../../core/hooks/useApi";
import { useAuthData } from "../../user/hooks/useAuthData";
import { useEffect, useState } from "react";

export function LobbyChatPage() {
  // const userId = useAuthData();
  // const navigate = useNavigate();
  // const [waitingReponse, setVerifyRequest] = usePostApi<{ userId: string }, {message: string}>(
  //   "http://localhost:5500/lobby/verify"
  // );
  // const [registerResponse, setRegisterBody] = usePostApi<{ userId: string }, {message: string}>(
  //   "http://localhost:5500/lobby/register"
  // );

 


  return (
    <Page>
      <Flex justify="center">
        <Card>
          <Flex direction="column" align="center">
            <Text size="6" weight="bold">
              You should have a chat here
            </Text>
          </Flex>
        </Card>
      </Flex>
    </Page>
  );
}
