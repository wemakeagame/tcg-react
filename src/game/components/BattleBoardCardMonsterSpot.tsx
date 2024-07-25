import { Card } from "@radix-ui/themes";
import { useEffect, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useAnimateKeyframes } from "react-simple-animate";
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
    blink: boolean;
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
    phase,
    blink
}) => {


    const { play, pause, style: animStyle } = useAnimateKeyframes({
        iterationCount: "infinite",
        direction: "alternate",
        duration: 0.5,
        keyframes: [
            "outline: 0px solid red",
            "outline: 10px solid red"
        ]
    });

    useEffect(() => {
        if (blink) {
            play(true);
            pause(false);
        } else {
            play(false);
            pause(true);
        }
    }, [blink])


    const onDropPosition = (gcard: GCard) => {
        return onDrop(gcard, boardPosition);
    }

    const [, drop] = useDrop(() => ({
        accept: ['monster', 'equipament'],
        drop: onDropPosition,
    }));

    const canAttack = isMyTurn && phase === 'attack';

    const hasActions = phase === 'maintenance' && isMyTurn;


    const baseStyle = useMemo(() => ({
        ...{
            width: "140px",
            height: "235px",
            background: '#594e4e',
            border: 'none',
            padding: "0",
            display: "flex",
            justifyContent: "center",
            transform: boardCard?.position === 'defense' ? "rotate(90deg)" : "rotate(0deg)",
        }, ...getAttackStyle(boardCard, canAttack), ...getActionStyle(boardCard, hasActions)
    }), [boardCard, canAttack, hasActions]);


    const baseWrapperStyle = {
        top: '-10px',
        borderRadius: '5px'
    };

    const currentAnimStyle = {
        ...animStyle, ...baseWrapperStyle
    }

    return <div style={blink ? currentAnimStyle : { ...baseWrapperStyle, ...{ outline: 'none' } }}>
        <Card ref={drop} style={baseStyle} onClick={() => onClick(boardCard)}>
            {
                boardCard && backCardUrl && <BoardMonsterCardView boardMosterCard={boardCard} backCardUrl={backCardUrl} />
            }
        </Card >
    </div>
}