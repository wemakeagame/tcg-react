/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { Page } from "../../core/components/Page";
import { usePostApi } from "../../core/hooks/useApi";
import { useAuthData } from "../../user/hooks/useAuthData";
import { useCallback, useEffect, useState } from "react";
import { ChatMessage, UserChat } from "../../user/components/UserChat";
import { useBattleVerify } from "../hooks/useBattleVerify";

export function LobbyChatPage() {
  const user = useAuthData(true);
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const matchResponse = useBattleVerify(user?.id);
  
  const [, setMessageBody] = usePostApi<
    { userId: string; message: string },
    { message: string }
  >("http://localhost:5500/match/chat");
  const [chat, setChat] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (matchResponse?.data?.chat) {
      setChat(matchResponse.data.chat);
    }
  }, [matchResponse]);

  const sendMessage = useCallback((message: string) => {
    if (user?.id) {
      setMessageBody({ userId: user?.id, message });
      setChat(chat => {
        const newChat = [...chat];
        newChat.push({ username: user.username, message });
        return newChat;
      })
    }
  }, []);

  const setReadyBattle = useCallback(() => {
    if (user?.id) {
      setMessageBody({ userId: user?.id, message: `${user.username} is ready!` });
      setIsReady(true);
    }
  }, [user?.id, user?.username]);

  useEffect(() => {
    if (isReady) {
      const timeOutRedirect = setTimeout(() => navigate('/battle'), 1000);

      return () => {
        clearTimeout(timeOutRedirect);
      }
    }
  }, [isReady]);

  return (
    <Page>
      <Flex justify="center">
        <Card>
          <Flex direction="column" align="center">
            <Text size="6" weight="bold">
              {user && (
                <>
                  <UserChat
                    username={user?.username}
                    chat={chat}
                    onSendMessage={sendMessage}
                  />
                  <Flex justify={'center'} style={{ margin: '10px' }}>
                    <Button onClick={() => setReadyBattle()} disabled={isReady || !chat.length}>{isReady ? 'Waiting the other player' : 'ready'}</Button>
                  </Flex>
                </>
              )}
            </Text>
          </Flex>
        </Card>
      </Flex >
    </Page >
  );
}
