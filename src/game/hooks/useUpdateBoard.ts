import { useEffect, useState } from "react";
import { GCard } from "../../card/model/gcard";
import { BoardMosterCard, PlayerMatch } from "../models/match";


export const useUpdateBoard = (
    player?: PlayerMatch, 
    cardResponse?: GCard[] | null) => {
        const [monsterBoard1, setMonsterBoard1] = useState<BoardMosterCard>();
        const [monsterBoard2, setMonsterBoard2] = useState<BoardMosterCard>();
        const [monsterBoard3, setMonsterBoard3] = useState<BoardMosterCard>();

        useEffect(() => {
            if (cardResponse && player?.monsters) {
                const monster1 = player.monsters.find(monster => monster.boardPostion === 1);
    
                if (monster1) {
                    monster1.gcard = cardResponse.find(card => card.id === monster1.gcardId);
                    setMonsterBoard1(monster1);
                }
    
                const monster2 = player.monsters.find(monster => monster.boardPostion === 2);
    
                if (monster2) {
                    monster2.gcard = cardResponse.find(card => card.id === monster2.gcardId);
                    setMonsterBoard2(monster2);
                }
    
                const monster3 = player.monsters.find(monster => monster.boardPostion === 3);
    
                if (monster3) {
                    monster3.gcard = cardResponse.find(card => card.id === monster3.gcardId);
                    setMonsterBoard3(monster3);
                }
            }
        }, [cardResponse, player]);


        return {
            monsterBoard1,
            monsterBoard2,
            monsterBoard3,
            setMonsterBoard1,
            setMonsterBoard2,
            setMonsterBoard3
        }
}