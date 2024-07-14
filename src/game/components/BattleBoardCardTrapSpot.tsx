import { Card } from "@radix-ui/themes";
import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { GCard, GCardType } from "../../card/model/gcard";
import { User } from "../../user/model/user";
import { BoardCard, BoardMosterCard, BoarSpellCard } from "../models/match";
import { BoardMonsterCardView } from "./BoardMonsterCardView";


// TODO: refactor for spells

type BattleBoardCardTrapSpotProps = {
    backCardUrl: User["backCard"];
    boardPosition: BoardCard['boardPostion'];
    boardCard?: BoarSpellCard;
    canAttack?: boolean;
    onDrop: (gcard: GCard, boardPostion: BoardCard['boardPostion']) => void;
}

const getAttackStyle = (boardMosterCard?: BoardMosterCard | null, canAttack?: boolean) => {
    return canAttack && boardMosterCard?.canAttack ? {
        outline: "3px solid blue"
    } : {};
}

export const BattleBoardCardTrapSpot: React.FC<BattleBoardCardTrapSpotProps> = ({
    onDrop,
    boardPosition,
    backCardUrl,
    boardCard,
    canAttack
}) => {

    const onDropPosition = (gcard: GCard) => {
        return onDrop(gcard, boardPosition);
    }

    const [, drop] = useDrop(() => ({
        accept: ['spell'],
        drop: onDropPosition,
    }));

    const boardMosterCard = boardCard?.gcard?.type.includes("monster") ? boardCard as BoardMosterCard : null;

    const style = useMemo(() => ({...{
        width: "140px",
        height: "235px",
        background: '#8700ff',
        border: "1px dashed #ccccccc",
        padding: "0",
        display: "flex",
        justifyContent: "center",
    }, ...getAttackStyle(boardMosterCard, canAttack)}), [boardMosterCard, canAttack]);

    return <Card ref={drop} style={style} >
        {
            boardCard && backCardUrl && <BoardMonsterCardView boardMosterCard={boardMosterCard} backCardUrl={backCardUrl} />
        }
    </Card >
}