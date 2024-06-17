import { Deck } from "./model/deck";
import { cardsMock } from "./model/gcard.mock";


export class DeckRepository {
    private data: Deck[] = [
        {
            userId: '1',
            gcardIds: [...cardsMock.map(gcard => gcard.id)]
        }
    ]

    public getUserDeck(userId: string) : Deck | undefined {
        return this.data.find(deck => deck.userId === userId);
    }        

}