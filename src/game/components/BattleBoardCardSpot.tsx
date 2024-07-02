import { Card } from "@radix-ui/themes";
import { useDrop } from "react-dnd";
import { GCard, GCardType } from "../../card/model/gcard";

type BattleBoardCardSpotProps = {
    type: GCardType[];
    onDrop: (gcard: GCard) => void;
}

export const BattleBoardCardSpot: React.FC<BattleBoardCardSpotProps> = ({type, onDrop}) => {
    const [,drop] = useDrop(() => ({
        accept: type,
        drop: onDrop,
      }));

    const style = {
        width: "170px", 
        height: "240px",
        background: (type.includes('spell') ? 'blue' : 'red'),
        top: type.includes('monster') ? '10px' : '0'
    }
      
    return <Card ref={drop} style={style}></Card>
}