import {Express, Request, Response} from 'express';
import { LobbyService } from '../services/lobbyService';

export class LobbyController {
    app : Express;
    path = '/match';
    matchService = new LobbyService();

    constructor(app: Express) {
        this.app = app;
    }

    listenMethods() {
       this.httpGetMethods();
       this.httpPostMethods();
    }

    private httpGetMethods () {

    }

    private httpPostMethods () {
        // register user for match
        this.app.post(`${this.path}/lobby`, (req: Request, res: Response) => {
            try {
                this.matchService.registerUserLobby(req.body?.userId);

                res.send({message: 'registerd'});
            } catch(e) {
                res.statusCode = 500;
                res.send({error: 'It was not possible to register now'});
            }
        });

        //wainting for match 
        this.app.post(`${this.path}/lobby/verify`, (req: Request, res: Response) => {
            try {
                const userId = req.body?.userId;
                this.matchService.verifyLobby(userId);
               const lobbyOponent = this.matchService.checkOponent(userId);

               if(lobbyOponent) {
                res.send({message: 'connect'});
               } else {
                res.send({message: 'waiting'});
               }
            } catch(e) {
                res.statusCode = 500;
                res.send({error: 'It was not possible to register now'});
            }
        });
    }

}