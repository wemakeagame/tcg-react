import { Injectable } from "@decorators/di";
import { GCard } from "./model/gcard";
import { User } from "./userRespository";


export type BoardCard = {
    gcardId: GCard['id']
    boardPostion: 1 | 2 | 3
    revelead : boolean
}

export type BoardMosterCard = BoardCard & {
    position: 'attack' | 'defense'
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
}


export type Match = {
    id?: number;
    player1: PlayerMatch;
    player2: PlayerMatch;
    turn: PlayerMatch['userId']
    chat: {username: string, message: string}[];
}
@Injectable()
export class MatchRepository {
    private data: Match[] = []
    private indexMatch = 0;

    public getMatchByUser(userId: string) {
        const match = this.data.find(match => match.player1.userId === userId || match.player2.userId === userId);

        if(match) {
            return {...match};
        } 

        return null;
    }

    public updateMatchConnection(match: Match) {
        this.data.forEach(m => {
            if(m.id === match.id) {
                m.player1.lastReceived = match.player1.lastReceived;
                m.player2.lastReceived = match.player2.lastReceived;
            }
        })
    }

    public isUserInMatch(userId1: string, userId2: string) {
        const isUserInAMatch = this.data.some(match => match.player1.userId === userId1 
            || match.player1.userId === userId2 
            || match.player2.userId === userId1 || match.player2.userId === userId2);

            return isUserInAMatch;
    }

    public registerMatch(match: Match) {
        this.indexMatch++;
        match.id = this.indexMatch;
        this.data.push(match);
    }

    public unregisterMatch(matchId: number) {
        this.data = this.data.filter(match => match.id !== matchId);
    }

    // // can be used only with remove user from match.
    public getMatchData() {
        return this.data;
    }

    private getMatchDataByUser(userId: User['id']) {
        const match = this.data.find(match => match.player1.userId === userId || match.player2.userId === userId);

        return match;
    }

    public placeMonsterCard(userId: string, cardToPlace: BoardMosterCard) {
        const match = this.getMatchDataByUser(userId);
        if(match) {
            const board = match.player1.userId === userId ? match.player1 : match.player2;
            board.monsters.push(cardToPlace);
            board.hasPlacedMonster = true;
        }
    }

    public removeCardFromHand(userId: string, gcardId: GCard['id']) {
        const match = this.getMatchDataByUser(userId);
        if(match) {
            const board = match.player1.userId === userId ? match.player1 : match.player2;
            board.hand = board.hand.filter(cardId => cardId !== gcardId);
        }
    }

    public updateMatchData(match: Match) {
        this.data.forEach((m, i) => {
            if(m.id == match.id) {
                this.data[i] = match;
            }
        })
    }

}