import { Card } from "@radix-ui/themes";
import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { GCard } from "../../card/model/gcard";
import { User } from "../../user/model/user";
import { BoardCard, BoardMosterCard, PlayerMatch } from "../models/match";
import { BoardMonsterCardView } from "./BoardMonsterCardView";

type BattleBoardCardMonsterSpotProps = {
    backCardUrl: User["backCard"];
    boardPosition: BoardCard['boardPostion'];
    boardCard?: BoardMosterCard;
    isMyTurn?: boolean;
    phase: PlayerMatch['phase'];
    onDrop: (gcard: GCard, boardPostion: BoardCard['boardPostion']) => void;
    onClick: (boardMonsterCard?: BoardMosterCard) => void;
}

const getAttackStyle = (boardMosterCard?: BoardMosterCard | null, canAttack?: boolean) => {
    return canAttack && boardMosterCard?.canAttack ? {
        outline: "3px solid blue"
    } : {};
}

const getActionStyle = (boardMosterCard?: BoardMosterCard | null, hasActions?: boolean) => {
    return hasActions && boardMosterCard?.gcard ? {
        outline: "3px solid red"
    } : {};
}

export const BattleBoardCardMonsterSpot: React.FC<BattleBoardCardMonsterSpotProps> = ({
    onDrop,
    onClick,
    boardPosition,
    backCardUrl,
    boardCard,
    isMyTurn,
    phase
}) => {

    const onDropPosition = (gcard: GCard) => {
        return onDrop(gcard, boardPosition);
    }

    const [, drop] = useDrop(() => ({
        accept: ['monster', 'equipament'],
        drop: onDropPosition,
    })); 

    const canAttack = isMyTurn && phase === 'attack';

    const hasActions = phase === 'maintenance' && isMyTurn;


    const style = useMemo(() => ({
        ...{
            width: "140px",
            height: "235px",
            background: '#594e4e',
            border: 'none',
            padding: "0",
            display: "flex",
            justifyContent: "center",
            top: '-10px',
            transform: boardCard?.position === 'defense' ? "rotate(90deg)" : "rotate(0deg)",
        }, ...getAttackStyle(boardCard, canAttack), ...getActionStyle(boardCard, hasActions)
    }), [boardCard, canAttack, hasActions]);

    return <Card ref={drop} style={style} onClick={() => onClick(boardCard)}>
        {
            boardCard && backCardUrl && <BoardMonsterCardView boardMosterCard={boardCard} backCardUrl={backCardUrl} />
        }
    </Card >
}