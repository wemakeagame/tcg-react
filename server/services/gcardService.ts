import { GCardRepository } from "../repositories/gcardRepository";
import { GCard } from "../repositories/model/gcard";

export class GcardService {
    gcardRepository: GCardRepository = new GCardRepository();

    // public addGCard(gcard: GCard): GCard | null {
    //     return this.gcardRepository.addCard(gcard);
    // }

    public getCard(id: string): GCard | undefined {
        return this.gcardRepository.getCard(id);
    }

    public getCards(): GCard[] {
        return this.gcardRepository.getCards();
    }
}