import { MatchRepository } from "../repositories/matchRepository";

const TIME_REMOVE_MATCH = 20000;
const TIME_CHECK_MATCH = 5000;
export class MatchService {
    matchRepository: MatchRepository = new MatchRepository();

    constructor() {
        // remove non respoding users from the list
        setInterval(() => {
            const matchData = this.matchRepository.getMatchData();

            matchData.forEach(match => {
                const lastReceivedPlayer1 = match.lastReceivedPlayer1.valueOf();
                const lastReceivedPlayer2 = match.lastReceivedPlayer2.valueOf();
                const diffDatePlayer1 = new Date().valueOf() - lastReceivedPlayer1;
                const diffDatePlayer2 = new Date().valueOf() - lastReceivedPlayer2;
                if(diffDatePlayer1 > TIME_REMOVE_MATCH || diffDatePlayer2 > TIME_REMOVE_MATCH) {
                    this.matchRepository.unregisterMatch(match.id);
                }

            });


        }, TIME_CHECK_MATCH);
    }


    public registerMatch(player1Id: string, player2Id: string) {
        this.matchRepository.registerMatch(player1Id, player2Id);
    }

    // public registerUserLobby(userId: string) {
    //     this.lobbyRepository.registerUserLobby(userId);
    // }

    // public unregisterUserLobby(userId: string) {
    //     this.lobbyRepository.unregisterUserLobby(userId);
    // }

    // public verifyLobby(userId: string) {
    //     const lobbyUser = this.getLobbyUser(userId);
    //     if(lobbyUser) {
    //         lobbyUser.lastReceived = new Date();
    //         this.lobbyRepository.updateLobbyUser(lobbyUser);
    //     }

    //     return false;
    // }

    // public getLobbyUser (userId: string) {
    //     return  this.lobbyRepository.getLobbyUser(userId);
    // }

    // public checkOponent(userId: string) {
    //     return this.lobbyRepository.checkOponent(userId);

    // }
}