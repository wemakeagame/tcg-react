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
      }))
      
    return <Card ref={drop} style={{width: "170px", height: "200px"}}></Card>
}