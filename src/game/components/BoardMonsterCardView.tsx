import { GCardView } from "../../card/components/GCard"
import { BoardMosterCard } from "../models/match"


type BoardMonsterCardProps = {
    boardMosterCard: BoardMosterCard | null,
    backCardUrl: string,
}

export const BoardMonsterCardView: React.FC<BoardMonsterCardProps> = ({boardMosterCard, backCardUrl}) => {
    return <>
        {(boardMosterCard && boardMosterCard.revelead && boardMosterCard.gcard ? (
          <GCardView gcard={boardMosterCard.gcard} isSelected={false} onSelect={() => null}/>
        ): <img
            src={`http://localhost:5500/${backCardUrl}`}
            alt=""
            style={{
              width: "135px",
              height: "215",
              background: "#ffffff",
              margin: "5px",
            }}
          ></img>)}
    </>
}