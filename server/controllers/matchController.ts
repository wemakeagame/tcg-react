import { Express, Request, Response } from "express";
import { MatchService } from "../services/matchService";
import { UserService } from "../services/userService";

export class MatchController {
  app: Express;
  path = "/match";
  matchService = new MatchService();
  userService;

  constructor(app: Express, userService: UserService) {
    this.app = app;
    this.userService = userService;
  }

  listenMethods() {
    this.httpGetMethods();
    this.httpPostMethods();
  }

  private httpGetMethods() {}

  private httpPostMethods() {
    // register message chat
    this.app.post(`${this.path}/chat`, (req: Request, res: Response) => {
      try {
        const user = this.userService.getUserNameById(req.body?.userId);
        if(user) {
          this.matchService.updateChat(req.body?.userId, req.body?.message, user.username);

          res.send({ message: "chat updated" });
        } else {
          res.statusCode = 500;
          res.send({ error: "User not allowed here" });
        }
     
      } catch (e) {
        res.statusCode = 500;
        res.send({ error: "It was not possible send the message now" });
      }
    });

    //wainting for match
    this.app.post(`${this.path}/verify`, (req: Request, res: Response) => {
      try {
        const userId = req.body?.userId;
        const match = this.matchService.getMatchByUser(req.body.userId);

        if (match) {
          res.send({ chat: match.chat });
          this.matchService.verifyConnection(userId);
        } else {
          res.send({ message: "disconnected" });
        }
      } catch (e) {
        res.statusCode = 500;
        res.send({ error: "It was not possible to verify connection" });
      }
    });
  }

  //TODO: update this when dependecy injection is already implemented.
  public registerMatch(player1Id: string, player2Id: string) {
    this.matchService.registerMatch(player1Id, player2Id);
  }
}
