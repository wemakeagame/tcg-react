import { MatchRepository } from "../repositories/matchRepository";

export class MatchService {
    matchRepository: MatchRepository = new MatchRepository();

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

    }
}