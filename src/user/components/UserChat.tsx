import { Card } from "@radix-ui/themes";
import * as Form from '@radix-ui/react-form';

export type ChatMessage = { username: string, message: string };

type UserChatProps = {
    username: string,
    chat: ChatMessage[],
}

export const UserChat: React.FC<UserChatProps> = ({ username, chat }) => {
    return <Card>
        <Card>
            <>{chat.map(chatMessage => <p><strong>{`${chatMessage.username}: `}</strong>{chatMessage.message}</p>
            )}</>
        </Card>
        <Form.Root className="FormRoot">
            <Form.Field className="FormField" name="question">
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <Form.Label className="FormLabel">{username}</Form.Label>
                    <Form.Message className="FormMessage" match="valueMissing">
                        type your message...
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <textarea className="Textarea" required />
                </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
                <button className="Button" style={{ marginTop: 10 }}>
                    Send
                </button>
            </Form.Submit>
        </Form.Root>
    </Card>
}