import { LobbyRepository } from "../repositories/lobbyRepository";

const TIME_REMOVE_LOBBY = 10000;
const TIME_CHECK_LOBBY = 1000;
export class LobbyService {
    matchRepository: LobbyRepository = new LobbyRepository();

    constructor() {
        const intervalDeleteOldLobby = setInterval(() => {
            const lobbyData = this.matchRepository.getLobbyData();

            lobbyData.forEach(lobby => {
                const lastReceived = lobby.lastReceived.valueOf();
                const diffDate = new Date().valueOf() - lastReceived;
                if(diffDate > TIME_REMOVE_LOBBY) {
                    this.matchRepository.unregisterUserLobby(lobby.userId);
                }

            });


        }, TIME_CHECK_LOBBY);
    }

    public registerUserLobby(userId: string) {
        this.matchRepository.registerUserLobby(userId);
    }

    public unregisterUserLobby(userId: string) {
        this.matchRepository.unregisterUserLobby(userId);
    }

    public verifyLobby(userId: string) {
        const lobbyUser = this.matchRepository.getLobbyUser(userId);
        if(lobbyUser) {
            lobbyUser.lastReceived = new Date();
            this.matchRepository.updateLobbyUser(lobbyUser);
        }

        return false;
    }

    public checkOponent(userId: string) {
        return this.matchRepository.checkOponent(userId);
    }
}