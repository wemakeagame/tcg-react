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
            const user = this.userService.getUser(req.params.username);

            const userRestrict = {...user};
            delete userRestrict.password;

            res.send(userRestrict || { error: 'Not Found'});
        })
    }

    private httpPostMethods () {
        // Save User
        this.app.post(`${this.path}`, (req: Request, res: Response) => {
            const saved = this.userService.addUser(req.body);
            let user = null;

            if(saved) {
                user = this.userService.getUser(req.body.username);
            }

            res.send(user || { error: 'It was not possible to save'});
        });

        //Authenticate
        this.app.post(`${this.path}/authenticate`, (req: Request, res: Response) => {
            res.send(this.userService.authenticateUser(req.body));
        });
    }


}