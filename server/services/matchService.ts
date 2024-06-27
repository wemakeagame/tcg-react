import { Match, MatchRepository } from "../repositories/matchRepository";

const TIME_REMOVE_MATCH = 5000;
const TIME_CHECK_MATCH = 5000;
export class MatchService {
    matchRepository: MatchRepository = new MatchRepository();

    constructor() {
        // remove non respoding users from the list
        setInterval(() => {
            const matchData = this.matchRepository.getMatchData();

            matchData.forEach(match => {
                if(match.id) {
                    const lastReceivedPlayer1 = match.player1.lastReceived.valueOf();
                    const lastReceivedPlayer2 = match.player2.lastReceived.valueOf();
                    const diffDatePlayer1 = new Date().valueOf() - lastReceivedPlayer1;
                    const diffDatePlayer2 = new Date().valueOf() - lastReceivedPlayer2;
                    if(diffDatePlayer1 > TIME_REMOVE_MATCH || diffDatePlayer2 > TIME_REMOVE_MATCH) {
                        this.matchRepository.unregisterMatch(match.id);
                    }
                }

            });


        }, TIME_CHECK_MATCH);
    }


    public registerMatch(player1Id: string, player2Id: string) {
        const isUserInAMatch = this.matchRepository.isUserInMatch(player1Id, player2Id);

        if(!isUserInAMatch) {
            const match: Match = {
                player1: {
                    lastReceived: new Date(),
                    userId: player1Id,
                    hand: [],
                    monsters: [],
                    traps: [],
                    deck: []
                },
                player2: {
                    lastReceived: new Date(),
                    userId: player2Id,
                    hand: [],
                    monsters: [],
                    traps: [],
                    deck: []
                },
                chat: [{
                    username: 'system',
                    message: 'player 1 connected'
                },
                {
                    username: 'system',
                    message: 'player 2 connected'
                }],
            }

            this.matchRepository.registerMatch(match);
        }        
    }


    // getCardDeck(userId: string) {

    // }

    public verifyConnection(userId: string) {
        const match = this.getMatchByUser(userId);
        if(match) {
            const isPlayer1:boolean = match.player1.userId === userId;
            if(isPlayer1) {
                match.player1.lastReceived = new Date();
            } else {
                match.player2.lastReceived  = new Date();
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