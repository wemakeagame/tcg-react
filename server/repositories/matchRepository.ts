import { Injectable } from "@decorators/di";
import { GCard, GCardMonster, GCardSpell } from "./model/gcard";

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
    player1: PlayerMatch;
    player2: PlayerMatch;
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

}