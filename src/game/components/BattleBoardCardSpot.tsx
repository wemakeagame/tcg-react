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
        width: "145px", 
        height: "225px",
        background: (type.includes('spell') ? '#8700ff' : '#594e4e'),
        border: "1px dashed #ccccccc",
        top: type.includes('monster') ? '-10px' : '0'
    }
      
    return <Card ref={drop} style={style}></Card>
}