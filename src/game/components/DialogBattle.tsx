import { Dialog, Flex } from "@radix-ui/themes";
import { GCardView } from "../../card/components/GCard";
import { BoardMosterCard } from "../models/match";

type DialogBattleProps = {
    open: boolean;
    onClose: () => void;
    attakingMoster: BoardMosterCard,
    blockingMoster: BoardMosterCard,
}

export const DialogBattle: React.FC<DialogBattleProps> = ({ open, attakingMoster, blockingMoster }) => {
    return <Dialog.Root open={open}>
        <Dialog.Content maxWidth="600px">
            <Dialog.Title>Battle</Dialog.Title>
            <Dialog.Description size="2" mb="4">
                
            </Dialog.Description>

            {attakingMoster?.gcard && blockingMoster?.gcard && <Flex gap="3" mt="4" justify="between" direction={'row'}>
                <GCardView gcard={attakingMoster.gcard}></GCardView>
                 <Flex justify={"center"} align={'center'}>X</Flex>
                <GCardView gcard={blockingMoster.gcard}></GCardView>
            </Flex>}
        </Dialog.Content>
    </Dialog.Root>

}