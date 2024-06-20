import {
  Button, Card, Flex, Text,
} from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { Page } from '../../core/components/Page';
import { Timer } from '../../core/components/Timer';

export function BattleWaitingPage() {
  return (
    <Page>
      <Flex justify="center">
        <Card>
          <Flex direction="column" align="center">
            <Flex style={{ alignSelf: 'end' }}><Link to="/user"><Button>Back</Button></Link></Flex>
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
