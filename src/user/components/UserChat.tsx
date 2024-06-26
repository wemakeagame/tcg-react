import { Card, Text, TextField } from "@radix-ui/themes";
import * as Form from '@radix-ui/react-form';

export type ChatMessage = { username: string, message: string };

type UserChatProps = {
    username: string,
    chat: ChatMessage[],
}

const getAlignmentMessage = (chatMessage: ChatMessage, username: string) => {
    return chatMessage.username === username ? 'right' : 'left';
}

export const UserChat: React.FC<UserChatProps> = ({ username, chat }) => {
    return <Card>
        <Text>Chat</Text>
        <Card style={{height :'200px', marginTop: '10px'}}>
            <div style={{height :'150px', overflow:'auto', padding: '10px'}}>{chat.map(chatMessage => <p style={{ fontSize: '12px', fontWeight: 'normal', margin: '0', textAlign: getAlignmentMessage(chatMessage, username) }}>
                <span style={{ fontSize: '15px', }}>
                    <strong>{`${chatMessage.username}: `}</strong>
                </span>
                {chatMessage.message}</p>
            )}</div>
        </Card>
        <Form.Root className="FormRoot">
            <Form.Field className="FormField" name="question">
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '15px' }}>
                    <Form.Control asChild style={{ flexGrow: 1 }}>
                        <TextField.Root
                            placeholder="type your message here"
                            style={{ minWidth: '300px' }}
                        />
                    </Form.Control>
                    <Form.Submit asChild>
                        <button className="Button" style={{ marginTop: 10 }}>
                            Send
                        </button>
                    </Form.Submit>
                </div>

            </Form.Field>

        </Form.Root>
    </Card >
}