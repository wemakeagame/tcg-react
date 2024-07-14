import { Button, Dialog, Flex } from "@radix-ui/themes"
import { BoardMosterCard } from "../models/match";
import revealIcon from '../../core/icons/reveal.svg';
import attackIcon from '../../core/icons/sword.svg';
import toggleAttack from '../../core/icons/toggle-attack.svg';

type DialogMonsterBoardActionsProps = {
    open: boolean;
    boardCard: BoardMosterCard;
    onClose: () => void;
    toggleBattlePosition: (boardCard: BoardMosterCard) => void;
    reveal: (boardCard: BoardMosterCard) => void;
    attack: (boardCard: BoardMosterCard) => void;
}

export const DialogMonsterBoardActions: React.FC<DialogMonsterBoardActionsProps> = ({
    open,
    onClose,
    boardCard,
    toggleBattlePosition,
    reveal,
    attack
}) => {
   
    return <Dialog.Root open={open}>
        <Dialog.Content maxWidth="600px">
            <Dialog.Title>Place the card</Dialog.Title>
            <Dialog.Description size="2" mb="4">
                Choose how you wanna place your card
            </Dialog.Description>

            <Flex gap="3" mt="4" justify="end" direction={'column'}>
                <Flex gap="3" justify={'center'}>
                    <Flex justify={'between'} direction="column" gap={'3'}>
                        <Button variant="soft" onClick={() => toggleBattlePosition(boardCard)} style={{ height: "100px", display: "flex", flexDirection: "column", padding: "15px" }}>
                            <img src={toggleAttack} alt="Message" style={{ width: "65px" }} />
                            Toggle attack and defense
                        </Button>
                        <Button variant="soft" onClick={() => reveal(boardCard)} style={{ height: "100px", display: "flex", flexDirection: "column", padding: "15px" }}>
                            <img src={revealIcon} alt="Message" style={{  width: "65px" }} />
                            Reveal card
                        </Button>
                        <Button variant="soft" onClick={() => attack(boardCard)} style={{ height: "100px", display: "flex", flexDirection: "column", padding: "15px" }}>
                            <img src={attackIcon} alt="Message" style={{ width: "65px" }} />
                           Attack
                        </Button>
                    </Flex>
                </Flex>
                <Button variant="soft" color="gray" onClick={() => onClose()}>
                    Cancel
                </Button>
            </Flex>
        </Dialog.Content>
    </Dialog.Root>
}