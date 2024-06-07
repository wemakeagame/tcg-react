import {Express, Request, Response} from 'express';
import { UserService } from '../services/userService';

export class UserController {
    app : Express;
    path = '/user';
    userService = new UserService();

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

                const userRestrict = {...user};
                delete userRestrict.password;

                if(userRestrict) {
                    res.send(userRestrict);
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
                const saved = this.userService.addUser(req.body);

                res.send(saved);
            } catch(e) {
                res.statusCode = 500;
                res.send({error: 'It was not possible to register now'});
            }
            
        });

        //Authenticate
        this.app.post(`${this.path}/authenticate`, (req: Request, res: Response) => {
            res.send(this.userService.authenticateUser(req.body));
        });
    }


}