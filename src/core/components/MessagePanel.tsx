import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";

type MessageProps = {
  messageText: string;
  messageHeader: string;
  imageUrl: string;
};

export const MessagePanel = ({
  messageText,
  messageHeader,
  imageUrl,
}: MessageProps) => {
  return (
    <Card>
      <Flex direction={"column"} align={"center"}>
        {imageUrl ? <img src={imageUrl} alt="Message" style={{maxHeight: '300px', maxWidth: 'auto'}} /> : null}
        <Text size="6">{messageHeader}</Text>
        <Text size="3">{messageText}</Text>
      </Flex>
    </Card>
  );
};
