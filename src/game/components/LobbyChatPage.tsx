/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Flex, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { Page } from "../../core/components/Page";
import { useInterval } from "../../core/hooks/useInterval";
import { usePostApi } from "../../core/hooks/useApi";
import { useAuthData } from "../../user/hooks/useAuthData";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ChatMessage, UserChat } from "../../user/components/UserChat";

export function LobbyChatPage() {
  const user = useAuthData();
  const navigate = useNavigate();
  const [matchResponse, setVerifyRequest] = usePostApi<
    { userId: string },
    { chat?: ChatMessage[]; message?: string }
  >("http://localhost:5500/match/verify");
  const [, setMessageBody] = usePostApi<
    { userId: string; message: string },
    { message: string }
  >("http://localhost:5500/match/chat");
  const [chat, setChat] = useState<ChatMessage[]>([]);

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

    if (matchResponse?.data?.chat) {
      setChat(matchResponse.data.chat);
    }
  }, [matchResponse]);

  const sendMessage = useCallback((message: string) => {
    if(user?.id) {
      setMessageBody({ userId: user?.id, message });
      setChat(chat => {
        const newChat = [...chat];
        newChat.push({ username: user.username, message});
        return newChat;
      })
    }
  }, []);

  return (
    <Page>
      <Flex justify="center">
        <Card>
          <Flex direction="column" align="center">
            <Text size="6" weight="bold">
              {user && (
                <UserChat
                  username={user?.username}
                  chat={chat}
                  onSendMessage={sendMessage}
                />
              )}
            </Text>
          </Flex>
        </Card>
      </Flex>
    </Page>
  );
}
