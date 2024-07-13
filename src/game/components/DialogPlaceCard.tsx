import { Button, Dialog, Flex } from "@radix-ui/themes"
import { GCard } from "../../card/model/gcard";
import { BoardCard, BoardMosterCard } from "../models/match";
import backCard from '../../core/icons/card-back.svg';
import frontCard from '../../core/icons/card-front.svg';

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
            boardPostion,
            canAttack: false,
        }

        onPlaceMonsterCard(boardMoster);
        onClose();
    }

    return <Dialog.Root open={open}>
        <Dialog.Content maxWidth="600px">
            <Dialog.Title>Place the card</Dialog.Title>
            <Dialog.Description size="2" mb="4">
                Choose how you wanna place your card
            </Dialog.Description>

            <Flex gap="3" mt="4" justify="end" direction={'column'}>
                {gcard.type === 'monster' ? <Flex gap="3" justify={'center'}>
                    <Flex justify={'between'} direction="column" gap={'3'}>
                        <Button variant="soft" onClick={() => placeMonsterDown(false, 'defense')} style={{ height: "100px", display: "flex", flexDirection: "column", padding: "15px" }}>
                            <img src={backCard} alt="Message" style={{ transform: "rotate(90deg", width: "65px" }} />
                            Place Defense face down
                        </Button>
                        <Button variant="soft" onClick={() => placeMonsterDown(true, 'defense')} style={{ height: "100px", display: "flex", flexDirection: "column", padding: "15px" }}>
                            <img src={frontCard} alt="Message" style={{ transform: "rotate(90deg", width: "65px" }} />
                            Place Defense face up
                        </Button>
                    </Flex>
                    <Flex justify={'between'} direction="column" gap={'3'}>
                        <Button variant="soft" onClick={() => placeMonsterDown(false, 'attack')} style={{ height: "100px", display: "flex", flexDirection: "column", padding: "15px" }}>
                            <img src={backCard} alt="Message" style={{ width: "65px" }} />
                            Place Attack face down
                        </Button>
                        <Button variant="soft" onClick={() => placeMonsterDown(true, 'attack')} style={{ height: "100px", display: "flex", flexDirection: "column", padding: "15px" }}>
                            <img src={frontCard} alt="Message" style={{ width: "65px" }} />
                            Place Attack face up
                        </Button>
                    </Flex>
                </Flex> : null}
                <Button variant="soft" color="gray" onClick={() => onClose()}>
                    Cancel
                </Button>
            </Flex>
        </Dialog.Content>
    </Dialog.Root>
}