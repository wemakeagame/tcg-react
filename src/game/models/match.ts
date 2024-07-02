import { GCard, GCardMonster, GCardSpell } from "../../card/model/gcard";

export type PlayerMatch = {
    lastReceived : Date;
    userId: string;
    hand: GCard['id'][];
    monsters: GCardMonster['id'][];
    traps: GCardSpell['id'][];
    deck: GCard['id'][];
}


export type Match = {
    id?: number;
    turn: PlayerMatch['userId'];
    player1?: PlayerMatch;
    player2?: PlayerMatch;
    chat: {username: string, message: string}[];
}