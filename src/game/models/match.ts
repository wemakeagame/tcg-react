import { GCard } from "../../card/model/gcard";
import { ChatMessage } from "../../user/components/UserChat";

export type BoardCard = {
    gcardId: GCard['id']
    boardPostion: 1 | 2 | 3
    revelead : boolean,
    gcard?: GCard
}

export type BoardMosterCard = BoardCard & {
    position: 'attack' | 'defense',
    canAttack: boolean,
}

export type BoardEquipamentCard = Omit<BoardCard, "revelead">;

export type BoarSpellCard = BoardCard;


export type PlayerMatch = {
    lastReceived : Date;
    userId: string;
    hand: GCard['id'][];
    monsters: BoardMosterCard[];
    traps: BoarSpellCard[];
    deck: GCard['id'][];
    hasPlacedMonster: boolean;
    life: number;
    handAmount?: number;
    deckAmount?: number;
    phase: "maintenance" | "attack";
}


export type Match = {
    id?: number;
    turn: PlayerMatch['userId'];
    player1?: PlayerMatch;
    player2?: PlayerMatch;
    chat: {username: string, message: string}[];
}


export type MatchResponseData =   { 
    chat?: ChatMessage[]; 
    message?: string, 
    player1?: PlayerMatch, 
    player2?: PlayerMatch, 
    turn: PlayerMatch['userId'] 
}