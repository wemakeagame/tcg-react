import { Flex } from "@radix-ui/themes";
import { GCard } from "../../card/model/gcard";
import { BoardCard, BoardMosterCard, PlayerMatch } from "../models/match";
import { BattleBoardCardMonsterSpot } from "./BattleBoardCardMonsterSpot";
import { BattleBoardCardTrapSpot } from "./BattleBoardCardTrapSpot";

type BattleBoardProps = {
    onDropCardStop: (gcard: GCard, boardPostion: BoardCard['boardPostion']) => void;
    backCardUrl: string,
    monsterBoard1?: BoardMosterCard,
    monsterBoard2?: BoardMosterCard,
    monsterBoard3?: BoardMosterCard,
    phase: PlayerMatch['phase'],
    isMyTurn: boolean,
    onSelectMonster: (boardMonsterCard?: BoardMosterCard) => void;
}


export const BattleBoard: React.FC<BattleBoardProps> = ({
    onDropCardStop,
    backCardUrl,
    monsterBoard1,
    monsterBoard2,
    monsterBoard3,
    phase,
    isMyTurn,
    onSelectMonster,
}) => {

    return <Flex flexGrow={'1'} justify={'between'} gap="2">
        <BattleBoardCardMonsterSpot onDrop={onDropCardStop} boardPosition={1} backCardUrl={backCardUrl} boardCard={monsterBoard1} isMyTurn={isMyTurn} phase={phase} onClick={onSelectMonster}/>
        <BattleBoardCardTrapSpot onDrop={onDropCardStop} boardPosition={1} backCardUrl={backCardUrl} />
        <BattleBoardCardMonsterSpot onDrop={onDropCardStop} boardPosition={2} backCardUrl={backCardUrl} boardCard={monsterBoard2} isMyTurn={isMyTurn} phase={phase} onClick={onSelectMonster}/>
        <BattleBoardCardTrapSpot onDrop={onDropCardStop} boardPosition={2} backCardUrl={backCardUrl} />
        <BattleBoardCardMonsterSpot onDrop={onDropCardStop} boardPosition={3} backCardUrl={backCardUrl} boardCard={monsterBoard3} isMyTurn={isMyTurn} phase={phase} onClick={onSelectMonster}/>
        <BattleBoardCardTrapSpot onDrop={onDropCardStop} boardPosition={3} backCardUrl={backCardUrl} />
    </Flex>
}