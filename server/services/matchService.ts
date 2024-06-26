import { MatchRepository } from "../repositories/matchRepository";

const TIME_REMOVE_MATCH = 5000;
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

    public verifyConnection(userId: string) {
        const match = this.getMatchByUser(userId);
        if(match) {
            const isPlayer1:boolean = match.player1Id === userId;
            if(isPlayer1) {
                match.lastReceivedPlayer1 = new Date();
            } else {
                match.lastReceivedPlayer2 = new Date();
            }
            
            this.matchRepository.updateMatchConnection(match);
        }

        return false;
    }

    public getMatchByUser (userId: string) {
        return  this.matchRepository.getMatchByUser(userId);
    }

    public updateChat( userId: string, message: string, username: string) {
        const match = this.getMatchByUser(userId);
        match?.chat.push({username, message})
    }
}