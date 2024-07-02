import { useDrag } from "react-dnd";
import { GCardView, GCardViewProps } from "./GCard";

type GCardDnDProps = GCardViewProps & {
    canDrag: boolean
}

export const GCardDnD: React.FC<GCardDnDProps> = ({
    gcard,
    isSelected,
    onSelect,
    canDrag
}) => {
    const [{opacity}, drag] = useDrag(() => ({
        type: gcard.type,
        item: gcard,
        collect: (monitor) => {
            return {
                opacity: monitor.isDragging() ? 0: 1
            }
        }
      }))

    const outline = canDrag ? '5px solid red' : 'none';

    return <div ref={canDrag ? drag : null} style={{opacity, outline }}><GCardView gcard={gcard} isSelected={isSelected} onSelect={onSelect} /></div>
}