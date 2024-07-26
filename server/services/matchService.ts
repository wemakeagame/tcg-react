import { Inject, Injectable } from "@decorators/di";
import { GCardRepository } from "../repositories/gcardRepository";
import { BoardCard, BoardMosterCard, Match, MatchRepository, PlayerMatch } from "../repositories/matchRepository";
import { Deck } from "../repositories/model/deck";
import { GCard, GCardMonster } from "../repositories/model/gcard";
import { User } from "../repositories/userRespository";
import { getRandomInt } from "../utils/utilsFunctions";
import { DeckService } from "./deckService";

const TIME_REMOVE_MATCH = 8000;
const TIME_CHECK_MATCH = 5000;

@Injectable()
export class MatchService {

    constructor(
        @Inject('MatchRepository') private matchRepository: MatchRepository,
        @Inject('DeckService') private deckService: DeckService,
        @Inject('GCardRepository') private gCardRepository: GCardRepository
    ) {
        // remove non respoding users from the list
        setInterval(() => {
            const matchData = this.matchRepository.getMatchData();

            matchData.forEach(match => {
                if (match.id) {
                    const lastReceivedPlayer1 = match.player1.lastReceived.valueOf();
                    const lastReceivedPlayer2 = match.player2.lastReceived.valueOf();
                    const diffDatePlayer1 = new Date().valueOf() - lastReceivedPlayer1;
                    const diffDatePlayer2 = new Date().valueOf() - lastReceivedPlayer2;
                    if (diffDatePlayer1 > TIME_REMOVE_MATCH || diffDatePlayer2 > TIME_REMOVE_MATCH) {
                        this.matchRepository.unregisterMatch(match.id);
                    }
                }

            });


        }, TIME_CHECK_MATCH);
    }


    public registerMatch(player1Id: User['id'], player2Id: User['id']) {
        const isUserInAMatch = this.matchRepository.isUserInMatch(player1Id, player2Id);

        if (!isUserInAMatch) {

            const deckPlayer1 = this.deckService.getUserDeck(player1Id);
            const deckPlayer2 = this.deckService.getUserDeck(player2Id);

            const match: Match = {
                turn: getRandomInt(0, 100) > 50 ? player1Id : player2Id,
                player1: {
                    lastReceived: new Date(),
                    userId: player1Id,
                    hand: [],
                    monsters: [],
                    traps: [],
                    deck: [],
                    hasPlacedMonster: false,
                    phase: 'maintenance',
                    life: 20,
                },
                player2: {
                    lastReceived: new Date(),
                    userId: player2Id,
                    hand: [],
                    monsters: [],
                    traps: [],
                    deck: [],
                    hasPlacedMonster: false,
                    phase: 'maintenance',
                    life: 20,
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

            if (deckPlayer1) {
                this.buyCard([...deckPlayer1.gcardIds], match.player1, 4);
            }

            if (deckPlayer2) {
                this.buyCard([...deckPlayer2.gcardIds], match.player2, 4);
            }

            if (deckPlayer1 && deckPlayer2) {
                this.matchRepository.registerMatch(match);
            }
        }
    }

    private buyCard(deckPlayer: Deck['gcardIds'], playerMatch: PlayerMatch, amount?: number) {
        const totalCards = amount || 1;
        let newPlayerDeck: Deck['gcardIds'] = deckPlayer;

        for (let i = 0; i < totalCards; i++) {
            const indexCard = getRandomInt(0, newPlayerDeck.length - 1);
            const gcardId = newPlayerDeck[indexCard];
            playerMatch.hand.push(gcardId);
            newPlayerDeck = newPlayerDeck.filter(id => id !== gcardId);
        }

        playerMatch.deck = newPlayerDeck;
    }

    public verifyConnection(userId: User['id']) {
        const match = this.getMatchByUser(userId);
        if (match) {
            const isPlayer1: boolean = match.player1.userId === userId;
            if (isPlayer1) {
                match.player1.lastReceived = new Date();
            } else {
                match.player2.lastReceived = new Date();
            }

            this.matchRepository.updateMatchConnection(match);
        }

        return false;
    }

    public getMatchByUser(userId: User['id']) {
        return this.matchRepository.getMatchByUser(userId);
    }

    public updateChat(userId: User['id'], message: string, username: string) {
        const match = this.getMatchByUser(userId);
        match?.chat.push({ username, message })
    }

    private checkIsCardInPosition(
        typeCard: GCard['type'],
        position: BoardCard['boardPostion'],
        playerMatch: PlayerMatch) {
        if (typeCard === 'monster') {
            return playerMatch.monsters.find(m => m.boardPostion === position);
        } else if (typeCard === 'spell') {
            return playerMatch.traps.find(m => m.boardPostion === position);
        }
    }

    public placeMonsterCard(userId: User['id'], cardToPlace: BoardMosterCard) {
        const match = this.getMatchByUser(userId);
        if (match) {
            const board = match.player1.userId === userId ? match.player1 : match.player2;
            const card = this.gCardRepository.getCard(cardToPlace.gcardId);
            if (card) {
                const isPostionFree = !this.checkIsCardInPosition(card.type, cardToPlace.boardPostion, board);

                if (isPostionFree) {
                    this.matchRepository.placeMonsterCard(userId, cardToPlace);
                    this.matchRepository.removeCardFromHand(userId, cardToPlace.gcardId);
                }
            }


        } else {
            throw new Error("User not present in a match");
        }

    }

    public toggleMonsterPosition(userId: User['id'], cardToPlace: BoardMosterCard) {
        const match = this.getMatchByUser(userId);
        if (match) {
            const card = this.gCardRepository.getCard(cardToPlace.gcardId);
            if (card) {
                this.matchRepository.toggleBattlePosition(userId, cardToPlace);
            }
        } else {
            throw new Error("User not present in a match");
        }
    }

    public revealCard(userId: User['id'], cardToPlace: BoardMosterCard) {
        const match = this.getMatchByUser(userId);
        if (match) {
            const card = this.gCardRepository.getCard(cardToPlace.gcardId);
            if (card) {
                this.matchRepository.revealCard(userId, cardToPlace);
            }
        } else {
            throw new Error("User not present in a match");
        }
    }


    public passTurn(userId: User['id']) {
        const match = this.getMatchByUser(userId);
        if (match) {
            const player1Match = match.player1;
            const player2Match = match.player2;


            if (player1Match.userId === userId && match.turn === userId) {
                match.turn = player2Match.userId
            } else {
                match.turn = player1Match.userId
            }

            player1Match.hasPlacedMonster = false;
            player2Match.hasPlacedMonster = false;
            player1Match.phase = 'maintenance';
            player2Match.phase = 'maintenance';

            player1Match.monsters.forEach(m => {
                m.canAttack = true;
            });

            player2Match.monsters.forEach(m => {
                m.canAttack = true;
            });

            this.matchRepository.updateMatchData(match);
        }
        else {
            throw new Error("User doesn't have a match");
        }

    }

    public passToAttackPhase(userId: User['id']) {
        const match = this.getMatchByUser(userId);
        if (match) {
            if (match.player1.userId === userId && match.turn === userId) {
                match.player1.phase = 'attack';
            } else {
                match.player2.phase = 'attack';
            }

            this.matchRepository.updateMatchData(match);
        }
        else {
            throw new Error("User doesn't have a match");
        }

    }

    public resolveAttack(userId: User['id'], attackingCardBoard: BoardMosterCard, opponentAttackPosition?: number) {
        const match = this.getMatchByUser(userId);

        let player: PlayerMatch | null = null;
        let opponent: PlayerMatch | null = null;

        if (match) {
            if (match.player1.userId === userId && match.turn === userId) {
                player = match.player1;
                opponent = match.player2;
            } 
            if (match.player2.userId === userId && match.turn === userId) {
                player = match.player2;
                opponent = match.player1;
            } 

            if(opponent && player) {
                if(opponentAttackPosition) {
                    // TODO calculate the battle
                    // TODO calculate traps
                } else {
                    const attackingCard = this.gCardRepository.getCard(attackingCardBoard.gcardId) as GCardMonster;
                    opponent.life -= attackingCard.power;
                    const boardMoster = player.monsters.find((m) => m.gcardId === attackingCard.id);
                    if(boardMoster) {
                        boardMoster.canAttack = false;
                        boardMoster.position = 'attack';
                        boardMoster.revelead = true;
                    }
                }
            } else {
                throw new Error("player or opponent coudn't be resolved");
            }

            this.matchRepository.updateMatchData(match);

            return true;
        }
        else {
            throw new Error("User doesn't have a match");
        }
    }
}