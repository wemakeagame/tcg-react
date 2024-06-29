import { Inject, Injectable } from "@decorators/di";
import { Match, MatchRepository, PlayerMatch } from "../repositories/matchRepository";
import { Deck } from "../repositories/model/deck";
import { getRandomInt } from "../utils/utilsFunctions";
import { DeckService } from "./deckService";

const TIME_REMOVE_MATCH = 8000;
const TIME_CHECK_MATCH = 5000;

@Injectable()
export class MatchService {
    
    constructor(
        @Inject('MatchRepository') private matchRepository: MatchRepository,
        @Inject('DeckService') private deckService: DeckService
    ) {
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

            const deckPlayer1 = this.deckService.getUserDeck(player1Id);
            const deckPlayer2 = this.deckService.getUserDeck(player2Id);
            
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

            if(deckPlayer1) {
                this.buyCard([...deckPlayer1.gcardIds], match.player1, 4);
            }

            if(deckPlayer2) {
                this.buyCard([...deckPlayer2.gcardIds], match.player2, 4);
            }

            this.matchRepository.registerMatch(match);
        }        
    }

    private buyCard(deckPlayer: Deck['gcardIds'], playerMatch: PlayerMatch, amount?: number) {
        const totalCards = amount || 1;
        let newPlayerDeck: Deck['gcardIds'] = [];

        for(let i = 0; i<totalCards; i++) {
            const indexCard = getRandomInt(0, deckPlayer.length - 1);
            const gcardId = deckPlayer[indexCard];
            playerMatch.hand.push(gcardId);
            newPlayerDeck = deckPlayer.filter(id => id !== gcardId);
        }

        playerMatch.deck = newPlayerDeck;
    }

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