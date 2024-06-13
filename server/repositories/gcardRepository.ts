import { GCard } from "./model/gcard";
import { cardsMock } from "./model/gcard.mock";

export class GCardRepository {
    data: GCard[] = cardsMock

    public getCard(id: string) : GCard | undefined {
        return this.data.find(card => card.id === id);
    }        


    public addCard(GCard: GCard): GCard | null {
        // TODO
        return null;
    }
}