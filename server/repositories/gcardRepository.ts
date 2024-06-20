import { GCard } from "./model/gcard";
import { cardsMock } from "./model/gcard.mock";

export class GCardRepository {
    private data: GCard[] = cardsMock

    public getCard(id: string) : GCard | undefined {
        return this.data.find(card => card.id === id);
    }        


    // public addCard(gcard: GCard): GCard | null {
    //     // TODO
    //     return null;
    // }

    public getCards() {
        return this.data;
    }
}