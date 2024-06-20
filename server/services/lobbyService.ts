import { LobbyRepository } from "../repositories/lobbyRepository";

const TIME_REMOVE_LOBBY = 10000;
const TIME_CHECK_LOBBY = 5000;
export class LobbyService {
    lobbyRepository: LobbyRepository = new LobbyRepository();

    constructor() {
        // remove non respoding users from the list
        setInterval(() => {
            const lobbyData = this.lobbyRepository.getLobbyData();

            lobbyData.forEach(lobby => {
                const lastReceived = lobby.lastReceived.valueOf();
                const diffDate = new Date().valueOf() - lastReceived;
                if(diffDate > TIME_REMOVE_LOBBY) {
                    this.lobbyRepository.unregisterUserLobby(lobby.userId);
                }

            });


        }, TIME_CHECK_LOBBY);
    }

    public registerUserLobby(userId: string) {
        this.lobbyRepository.registerUserLobby(userId);
    }

    public unregisterUserLobby(userId: string) {
        this.lobbyRepository.unregisterUserLobby(userId);
    }

    public verifyLobby(userId: string) {
        const lobbyUser = this.lobbyRepository.getLobbyUser(userId);
        if(lobbyUser) {
            lobbyUser.lastReceived = new Date();
            this.lobbyRepository.updateLobbyUser(lobbyUser);
        }

        return false;
    }

    public checkOponent(userId: string) {
        return this.lobbyRepository.checkOponent(userId);

    }
}