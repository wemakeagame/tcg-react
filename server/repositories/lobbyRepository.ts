type Lobby = {
    userId: string;
    queueIndex: number;
    lastReceived: Date;
}

export class LobbyRepository {
    private data: Lobby[] = []
    private indexLobby = 0;

    public registerUserLobby(userId: string) {
        const isUserInTheLobby = this.data.some(lobby => lobby.userId === userId);

        if(!isUserInTheLobby) {
            this.indexLobby++;
            this.data.push({
                userId, 
                queueIndex: this.indexLobby,
                lastReceived: new Date()
            })
        }        
    }

    public getLobbyUser(userId: string) {
        const lobbyUser = this.data.find(lobby => lobby.userId === userId);

        if(lobbyUser) {
            return {...lobbyUser};
        } 

        return null;
    }

    public updateLobbyUser(lobbyUser: Lobby) {
        this.data.forEach(lobby => {
            if(lobby.userId === lobbyUser.userId) {
                lobby.lastReceived = lobbyUser.lastReceived;
            }
        })
    }

    public unregisterUserLobby(userId: string) {
        this.data = this.data.filter(lobby => lobby.userId !== userId);
    }

    // can be used only with remove user from lobby.
    public getLobbyData() {
        return this.data;
    }


    public checkOponent(userId: string) {
        const filteredLobby = this.data.filter(lobby => lobby.userId !== userId);
        filteredLobby.sort((a, b) => a.queueIndex - b.queueIndex);
        if(filteredLobby.length) {
            return filteredLobby[0];
        }

        return null;
    }


}