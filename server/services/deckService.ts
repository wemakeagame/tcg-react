import { DeckRepository } from "../repositories/deckRepository";

export class DeckService {
    private deckRepository: DeckRepository = new DeckRepository();

    public getUserDeck (userId: string) {
        return this.deckRepository.getUserDeck(userId);
    }

}