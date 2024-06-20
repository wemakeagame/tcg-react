/* eslint-disable no-useless-catch */
import {Express, Request, Response} from 'express';
import { GcardService } from '../services/gcardService';

export class GCardController {
    app : Express;
    path = '/gcard';
    gcardService = new GcardService();

    constructor(app: Express) {
        this.app = app;
    }

    listenMethods() {
       this.httpGetMethods();
       this.httpPostMethods();
    }

    private httpGetMethods () {

        //Get card by id
        this.app.get(`${this.path}/:gcardId`, (req: Request, res: Response) => {
            try  {
                const gcard = this.gcardService.getCard(req.params.gcardId);

                if(gcard) {
                    res.send(gcard);
                } else {
                    res.statusCode = 404;
                    res.send({ error: 'Not Found'});
                }
            } catch (e) {
                throw e;
            }
        })

        // get all cards
        this.app.get(`${this.path}`, (req: Request, res: Response) => {
            try  {
                const gcards = this.gcardService.getCards();
                res.send(gcards);
            } catch (e) {
                throw e;
            }
        })
    }

    private httpPostMethods () {
        // Save Card
        // this.app.post(`${this.path}`, (req: Request, res: Response) => {
        //     try {
        //         const saved = this.userService.addUser(req.body);

        //         res.send(saved);
        //     } catch(e) {
        //         res.statusCode = 500;
        //         res.send({error: 'It was not possible to register now'});
        //     }
            
        // });
    }

}