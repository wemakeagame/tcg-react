import { Flex, Text } from '@radix-ui/themes';
import { MessagePanel } from '../../core/components/MessagePanel';
import { LoginContainer } from '../../user/components/LoginContainer';
import { Page } from '../../core/components/Page';

export function MainPage() {
  return (
    <Page>
      <Text size="3" align="center" style={{ margin: '15px' }}>
        Welcome to the TCG made in react, create an account and start to battle
      </Text>
      <Flex gap="2">
        <Flex direction="column" flexGrow="1.5">
          <MessagePanel
            imageUrl="./image/message-image.png"
            messageHeader="Important"
            messageText="Welcome to the page, login to start"
          />
        </Flex>
        <Flex direction="column" flexGrow="1">
          <LoginContainer />
        </Flex>
      </Flex>
    </Page>
  );
}
