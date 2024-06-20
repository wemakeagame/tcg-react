/* eslint-disable no-useless-catch */
import {Express, Request, Response} from 'express';
import { UserService } from '../services/userService';
import { User } from '../repositories/userRespository';
import { DeckService } from '../services/deckService';

export class UserController {
    app : Express;
    path = '/user';
    userService = new UserService();
    deckService = new DeckService();

    constructor(app: Express) {
        this.app = app;
    }

    listenMethods() {
       this.httpGetMethods();
       this.httpPostMethods();
    }

    private httpGetMethods () {
        this.app.get(`${this.path}/:username`, (req: Request, res: Response) => {
            try  {
                const user = this.userService.getUser(req.params.username);

                if(user) {
                    res.send(this.removePassword(user));
                } else {
                    res.statusCode = 404;
                    res.send({ error: 'Not Found'});
                }
            } catch (e) {
                throw e;
            }
           
        })

        //Get user deck
        this.app.get(`${this.path}/:userId/deck`, (req: Request, res: Response) => {
            try  {
                const deck  = this.deckService.getUserDeck(req.params.userId);

                if(deck) {
                    res.send(deck);
                } else {
                    res.statusCode = 404;
                    res.send({ error: 'Not Found'});
                }
            } catch (e) {
                throw e;
            }
           
        })
    }

    private httpPostMethods () {
        // Save User
        this.app.post(`${this.path}`, (req: Request, res: Response) => {
            try {
                const saved: User = this.userService.addUser(req.body);
                this.deckService.registerNewUserDeck(saved.id);

                res.send(saved);
            } catch(e) {
                res.statusCode = 500;
                res.send({error: 'It was not possible to register now'});
            }
            
        });

        //Authenticate
        this.app.post(`${this.path}/authenticate`, (req: Request, res: Response) => {
            const user = this.userService.authenticateUser(req.body);

            if(user) {
                res.send(this.removePassword(user));
            } else {
                res.send(null);
            }
        });

        // Add card to deck
        this.app.post(`${this.path}/addCardDeck`, (req: Request, res: Response) => {
            try {
                const {userId, gcardId} = req.body;
                const response = this.deckService.addCardDeck(userId, gcardId)
    
                if(response === 'added') {
                    res.send({message: response});
                }
            } catch (e) {
                throw e;
            }
        });

         // Remove card to deck
         this.app.post(`${this.path}/removeCardDeck`, (req: Request, res: Response) => {
            try {
                const {userId, gcardId} = req.body;
                const response = this.deckService.removeCardDeck(userId, gcardId)
    
                if(response === 'removed') {
                    res.send({message: response});
                }
            } catch (e) {
                throw e;
            }
        });
    }

    removePassword(user: User) {
        const userRestrict = {...user};
        delete userRestrict.password;

        return userRestrict;
    }




}