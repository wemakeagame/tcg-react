import { Button, Dialog, Flex } from "@radix-ui/themes"
import { GCard } from "../../card/model/gcard";

type DialogPlaceCardProps = {
    open: boolean;
    gcard: GCard;
    onClose: () => void;
}

export const DialogPlaceCard: React.FC<DialogPlaceCardProps> = ({
    open,
    gcard,
    onClose
}) => {
    return <Dialog.Root open={open}>
        <Dialog.Content maxWidth="450px">
            <Dialog.Title>Place the card</Dialog.Title>
            <Dialog.Description size="2" mb="4">
                Choose how you wanna place your card
            </Dialog.Description>

            <Flex gap="3" mt="4" justify="end" direction={'column'}>
                {gcard.type === 'monster' ? <Flex direction={'column'} gap="3">
                    <Button>
                        Place Defense face down
                    </Button>
                    <Button variant="soft" >
                        Place Defense face up
                    </Button>
                    <Button>
                        Place Attack face down
                    </Button>
                    <Button variant="soft" >
                        Place Attack face up
                    </Button>
                </Flex> : null}
                <Button variant="soft" color="gray" onClick={() => onClose()}>
                    Cancel
                </Button>
            </Flex>
        </Dialog.Content>
    </Dialog.Root>
}