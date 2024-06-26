type Match = {
    id: number;
    player1Id: string;
    player2Id: string;
    lastReceivedPlayer1 : Date;
    lastReceivedPlayer2: Date;
    chat: {playerId: string, message: string}[];
}

export class MatchRepository {
    private data: Match[] = []
    private indexMatch = 0;

    public registerMatch(player1Id: string, player2Id: string) {
        const isUserInAMatch = this.data.some(match => match.player1Id === player1Id || match.player1Id === player2Id || match.player2Id === player1Id || match.player2Id === player2Id);

        if(!isUserInAMatch) {
            this.indexMatch++;
            this.data.push({
                id: this.indexMatch,
                player1Id,
                player2Id,
                chat: [],
                lastReceivedPlayer1: new Date(),
                lastReceivedPlayer2: new Date(),
            })
        }        
    }

    public getMatchByUser(userId: string) {
        const match = this.data.find(match => match.player1Id === userId || match.player2Id === userId);

        if(match) {
            return {...match};
        } 

        return null;
    }

    public updateMatchConnection(match: Match) {
        this.data.forEach(m => {
            if(m.id === match.id) {
                m.lastReceivedPlayer1 = match.lastReceivedPlayer1;
                m.lastReceivedPlayer2 = match.lastReceivedPlayer2;
            }
        })
    }

    public unregisterMatch(matchId: number) {
        this.data = this.data.filter(match => match.id !== matchId);
    }

    // // can be used only with remove user from match.
    public getMatchData() {
        return this.data;
    }


    // public checkOponent(userId: string) {
    //     const filteredLobby = this.data.filter(lobby => lobby.userId !== userId && !lobby.oponentUserId);
    //     filteredLobby.sort((a, b) => a.queueIndex - b.queueIndex);
    //     if(filteredLobby.length) {
    //         const oponent = filteredLobby[0];
    //         oponent.oponentUserId = userId;
    //         const user = this.getLobbyUser(userId);

    //         if(user) {
    //             user.oponentUserId = oponent.userId;
    //             this.updateLobbyUser(user);
    //         }
            
    //         return oponent;
    //     }

    //     return null;
    // }


}