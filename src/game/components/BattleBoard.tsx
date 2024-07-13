import { Flex } from "@radix-ui/themes";
import { GCard } from "../../card/model/gcard";
import { BoardCard, BoardMosterCard } from "../models/match";
import { BattleBoardCardSpot } from "./BattleBoardCardSpot"

type BattleBoardProps = {
    onDropCardStop: (gcard: GCard, boardPostion: BoardCard['boardPostion']) => void;
    backCardUrl: string,
    monsterBoard1?: BoardMosterCard
    monsterBoard2?: BoardMosterCard
    monsterBoard3?: BoardMosterCard
}

export const BattleBoard: React.FC<BattleBoardProps> = ({ 
    onDropCardStop, 
    backCardUrl, 
    monsterBoard1,
    monsterBoard2,
    monsterBoard3
}) => {

    return <Flex flexGrow={'1'} justify={'between'} gap="2">
        <BattleBoardCardSpot type={['monster', 'equipament']} onDrop={onDropCardStop} boardPosition={1} backCardUrl={backCardUrl} boardCard={monsterBoard1} />
        <BattleBoardCardSpot type={['spell']} onDrop={onDropCardStop} boardPosition={1} backCardUrl={backCardUrl} />
        <BattleBoardCardSpot type={['monster', 'equipament']} onDrop={onDropCardStop} boardPosition={2} backCardUrl={backCardUrl} boardCard={monsterBoard2} />
        <BattleBoardCardSpot type={['spell']} onDrop={onDropCardStop} boardPosition={2} backCardUrl={backCardUrl} />
        <BattleBoardCardSpot type={['monster', 'equipament']} onDrop={onDropCardStop} boardPosition={3} backCardUrl={backCardUrl} boardCard={monsterBoard3} />
        <BattleBoardCardSpot type={['spell']} onDrop={onDropCardStop} boardPosition={3} backCardUrl={backCardUrl} />
    </Flex>
}