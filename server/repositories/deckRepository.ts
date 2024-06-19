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
    
    public addCardDeck(userId: string, gcardId: string) {
        const userDeck = this.getUserDeck(userId);

        if(!userDeck?.gcardIds.includes(gcardId)) {
            userDeck?.gcardIds.push(gcardId);

            return 'added';
        }

        throw new Error('Not found');
    }

    public removeCardDeck(userId: string, gcardId: string) {
        const userDeck = this.getUserDeck(userId);

        if(userDeck) {
            userDeck.gcardIds =  userDeck.gcardIds.filter(id => id !== gcardId);
            return 'removed';
        }

        throw new Error('Not found');
    }

}