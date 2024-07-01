import { useDrag } from "react-dnd";
import { GCardView, GCardViewProps } from "./GCard";

export const GCardDnD: React.FC<GCardViewProps> = ({
    gcard,
    isSelected,
    onSelect,
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


    return <div ref={drag} style={{opacity}}><GCardView gcard={gcard} isSelected={isSelected} onSelect={onSelect} /></div>
}