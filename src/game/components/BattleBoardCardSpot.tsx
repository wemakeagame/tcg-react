import { Card } from "@radix-ui/themes";
import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { GCard, GCardType } from "../../card/model/gcard";
import { User } from "../../user/model/user";
import { BoardCard, BoardMosterCard } from "../models/match";

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

    const [,drop] = useDrop(() => ({
        accept: type,
        drop: onDropPosition,
      }));

    const boardCardMonster = boardCard?.gcard?.type.includes("monster") ? boardCard as BoardMosterCard : null;

    const style = useMemo(() => ({
        width: "145px", 
        height: "225px",
        background: (type.includes('spell') ? '#8700ff' : '#594e4e'),
        border: "1px dashed #ccccccc",
        padding: "0",
        top: type.includes('monster') ? '-10px' : '0',
        transform: type.includes('monster') && boardCardMonster?.position === 'defense' ? "rotate(90deg)" : "rotate(0deg)",
    }), [boardCardMonster]);
      
    return <Card ref={drop} style={style}>
        {
            boardCard && (boardCardMonster && boardCardMonster.revelead ? "renderiza": <img
            src={`http://localhost:5500/${backCardUrl}`}
            alt=""
            style={{
              width: "135px",
              height: "215",
              border: "1px solid #000000",
              background: "#ffffff",
              margin: "5px",
            }}
          ></img>)
        }
    </Card>
}