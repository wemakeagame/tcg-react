import { DeckRepository } from "../repositories/deckRepository";

export class DeckService {
    private deckRepository: DeckRepository = new DeckRepository();

    public getUserDeck (userId: string) {
        return this.deckRepository.getUserDeck(userId);
    }

    public addCardDeck(userId: string, gcardId:string) : string {
        return this.deckRepository.addCardDeck(userId, gcardId);
    }

    public removeCardDeck(userId: string, gcardId:string): string {
        return this.deckRepository.removeCardDeck(userId, gcardId);
    }

}