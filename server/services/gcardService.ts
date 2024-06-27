import { Inject, Injectable } from "@decorators/di";
import { GCardRepository } from "../repositories/gcardRepository";
import { GCard } from "../repositories/model/gcard";

@Injectable()
export class GcardService {

    constructor(@Inject('GCardRepository') private gcardRepository: GCardRepository){}

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