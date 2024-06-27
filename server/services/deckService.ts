import { Inject, Injectable } from "@decorators/di";
import { DeckRepository } from "../repositories/deckRepository";

@Injectable()
export class DeckService {
    constructor(@Inject('DeckRepository') private deckRepository: DeckRepository){}

    public getUserDeck (userId: string) {
        return this.deckRepository.getUserDeck(userId);
    }

    public addCardDeck(userId: string, gcardId:string) : string {
        return this.deckRepository.addCardDeck(userId, gcardId);
    }

    public removeCardDeck(userId: string, gcardId:string): string {
        return this.deckRepository.removeCardDeck(userId, gcardId);
    }

    public registerNewUserDeck(userId: string) {
        return this.deckRepository.registerNewUserDeck(userId);
    }

}