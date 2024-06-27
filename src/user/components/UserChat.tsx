import { Button, Card, Text, TextField } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useCallback, useEffect, useRef, useState } from "react";

export type ChatMessage = { username: string; message: string };

type UserChatProps = {
  username: string;
  chat: ChatMessage[];
  onSendMessage: (message: string) => void;
};

const getAlignmentMessage = (chatMessage: ChatMessage, username: string) => {
  return chatMessage.username === username ? "right" : "left";
};

const getColorMessage = (chatMessage: ChatMessage, username: string) => {
  return chatMessage.username === username
    ? "red"
    : chatMessage.username === "system"
    ? "green"
    : "blue";
};

export const UserChat: React.FC<UserChatProps> = ({
  username,
  chat,
  onSendMessage,
}) => {
  const [message, setMessage] = useState<string>();
  const messagesListRef = useRef<HTMLDivElement | null>(null);

  const scrollChat = useCallback(() => {
    messagesListRef.current?.scrollTo({
      top: messagesListRef.current?.scrollHeight,
    });
  }, [messagesListRef.current]);

  const sendMessage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setMessage((prevMessage) => {
        if (prevMessage) {
          onSendMessage(prevMessage);
        }
        scrollChat();
        return "";
      });
    },
    []
  );

  useEffect(() => {
    scrollChat();
  }, [chat]);

  return (
    <Card>
      <Text>Chat {username}</Text>
      <Card style={{ height: "200px", marginTop: "10px" }}>
        <div
          style={{
            height: "150px",
            overflow: "auto",
            padding: "10px",
            paddingRight: "20px",
          }}
          ref={messagesListRef}
        >
          {!chat.length && <Text size={"1"}>connecting chat...</Text>}
          {chat.map((chatMessage, i) => (
            <p
              style={{
                fontSize: "12px",
                fontWeight: "normal",
                borderBottom: "1px dashed #f9f9f9",
                backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#ffffff",
                margin: "0",
                textAlign: getAlignmentMessage(chatMessage, username),
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  color: getColorMessage(chatMessage, username),
                }}
              >
                <strong>{`${
                  username === chatMessage.username
                    ? "you"
                    : chatMessage.username
                }: `}</strong>
              </span>
              {chatMessage.message}
            </p>
          ))}
        </div>
      </Card>
      <Form.Root className="FormRoot">
        <Form.Field className="FormField" name="chat">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "15px",
            }}
          >
            <Form.Control asChild style={{ flexGrow: 1 }}>
              <TextField.Root
                placeholder="type your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ minWidth: "300px" }}
              />
            </Form.Control>
            <Button style={{ marginTop: 10 }} onClick={(e) => sendMessage(e)}>
              Send
            </Button>
          </div>
        </Form.Field>
      </Form.Root>
    </Card>
  );
};
