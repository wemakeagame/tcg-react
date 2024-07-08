import { Card } from "@radix-ui/themes";
import { useDrop } from "react-dnd";
import { GCard, GCardType } from "../../card/model/gcard";
import { User } from "../../user/model/user";
import { BoardCard } from "../models/match";

type BattleBoardCardSpotProps = {
    type: GCardType[];
    backCardUrl: User["backCard"];
    boardPosition: BoardCard['boardPostion'];
    onDrop: (gcard: GCard, boardPostion: BoardCard['boardPostion']) => void;
}

export const BattleBoardCardSpot: React.FC<BattleBoardCardSpotProps> = ({type, onDrop, boardPosition}) => {

    const onDropPosition = (gcard: GCard) => {
        return onDrop(gcard, boardPosition);
    }

    const [,drop] = useDrop(() => ({
        accept: type,
        drop: onDropPosition,
      }));

    const style = {
        width: "145px", 
        height: "225px",
        background: (type.includes('spell') ? '#8700ff' : '#594e4e'),
        border: "1px dashed #ccccccc",
        top: type.includes('monster') ? '-10px' : '0'
    }
      
    return <Card ref={drop} style={style}></Card>
}