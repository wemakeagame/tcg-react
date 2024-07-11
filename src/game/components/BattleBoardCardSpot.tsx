import { Card } from "@radix-ui/themes";
import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { GCard, GCardType } from "../../card/model/gcard";
import { User } from "../../user/model/user";
import { BoardCard, BoardMosterCard } from "../models/match";
import { BoardMonsterCardView } from "./BoardMonsterCardView";

type BattleBoardCardSpotProps = {
    type: GCardType[];
    backCardUrl: User["backCard"];
    boardPosition: BoardCard['boardPostion'];
    boardCard?: BoardCard;
    onDrop: (gcard: GCard, boardPostion: BoardCard['boardPostion']) => void;
}

export const BattleBoardCardSpot: React.FC<BattleBoardCardSpotProps> = ({
    type,
    onDrop,
    boardPosition,
    backCardUrl,
    boardCard
}) => {

    const onDropPosition = (gcard: GCard) => {
        return onDrop(gcard, boardPosition);
    }

    const [, drop] = useDrop(() => ({
        accept: type,
        drop: onDropPosition,
    }));

    const boardMosterCard = boardCard?.gcard?.type.includes("monster") ? boardCard as BoardMosterCard : null;

    const style = useMemo(() => ({
        width: "140px",
        height: "235px",
        background: (type.includes('spell') ? '#8700ff' : '#594e4e'),
        border: "1px dashed #ccccccc",
        padding: "0",
        display: "flex",
        justifyContent: "center",
        top: type.includes('monster') ? '-10px' : '0',
        transform: type.includes('monster') && boardMosterCard?.position === 'defense' ? "rotate(90deg)" : "rotate(0deg)",
    }), [boardMosterCard]);

    return <Card ref={drop} style={style}>
        {
            boardCard && backCardUrl && <BoardMonsterCardView boardMosterCard={boardMosterCard} backCardUrl = { backCardUrl } />
        }
    </Card>
}