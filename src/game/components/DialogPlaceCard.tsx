import { Button, Dialog, Flex } from "@radix-ui/themes"
import { GCard } from "../../card/model/gcard";
import { BoardCard, BoardMosterCard } from "../models/match";

type DialogPlaceCardProps = {
    open: boolean;
    gcard: GCard;
    boardPostion: BoardCard['boardPostion']
    onClose: () => void;
    onPlaceMonsterCard: (boardCard: BoardMosterCard) => void;
}

export const DialogPlaceCard: React.FC<DialogPlaceCardProps> = ({
    open,
    gcard,
    onClose,
    boardPostion,
    onPlaceMonsterCard,
}) => {
    const placeMonsterDown = (revelead: boolean, position: BoardMosterCard['position']) => {
        const boardMoster: BoardMosterCard = {
            position: position,
            gcardId: gcard.id,
            revelead: revelead,
            boardPostion
        }

        onPlaceMonsterCard(boardMoster);
        onClose();
    }

    return <Dialog.Root open={open}>
        <Dialog.Content maxWidth="450px">
            <Dialog.Title>Place the card</Dialog.Title>
            <Dialog.Description size="2" mb="4">
                Choose how you wanna place your card
            </Dialog.Description>

            <Flex gap="3" mt="4" justify="end" direction={'column'}>
                {gcard.type === 'monster' ? <Flex direction={'column'} gap="3">
                    <Button onClick={() => placeMonsterDown(false, 'defense')}>
                        Place Defense face down
                    </Button>
                    <Button variant="soft" onClick={() => placeMonsterDown(true, 'defense')}>
                        Place Defense face up
                    </Button>
                    <Button onClick={() => placeMonsterDown(false, 'attack')}>
                        Place Attack face down
                    </Button>
                    <Button variant="soft" onClick={() => placeMonsterDown(true, 'attack')}>
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