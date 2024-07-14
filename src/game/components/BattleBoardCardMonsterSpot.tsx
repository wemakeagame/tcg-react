import { Card } from "@radix-ui/themes";
import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { GCard, GCardType } from "../../card/model/gcard";
import { User } from "../../user/model/user";
import { BoardCard, BoardMosterCard } from "../models/match";
import { BoardMonsterCardView } from "./BoardMonsterCardView";

type BattleBoardCardMonsterSpotProps = {
    backCardUrl: User["backCard"];
    boardPosition: BoardCard['boardPostion'];
    boardCard?: BoardMosterCard;
    canAttack?: boolean;
    onDrop: (gcard: GCard, boardPostion: BoardCard['boardPostion']) => void;
}

const getAttackStyle = (boardMosterCard?: BoardMosterCard | null, canAttack?: boolean) => {
    return canAttack && boardMosterCard?.canAttack ? {
        outline: "3px solid blue"
    } : {};
}

export const BattleBoardCardMonsterSpot: React.FC<BattleBoardCardMonsterSpotProps> = ({
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
        accept: ['monster', 'equipament'],
        drop: onDropPosition,
    }));

    
    const style = useMemo(() => ({...{
        width: "140px",
        height: "235px",
        background: '#594e4e',
        border: "1px dashed #ccccccc",
        padding: "0",
        display: "flex",
        justifyContent: "center",
        top: '-10px',
        transform: boardCard?.position === 'defense' ? "rotate(90deg)" : "rotate(0deg)",
    }, ...getAttackStyle(boardCard, canAttack)}), [boardCard, canAttack]);

    return <Card ref={drop} style={style} >
        {
            boardCard && backCardUrl && <BoardMonsterCardView boardMosterCard={boardCard} backCardUrl={backCardUrl} />
        }
    </Card >
}