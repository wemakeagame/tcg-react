import { Express, Request, Response } from "express";
import { LobbyService } from "../services/lobbyService";

export class LobbyController {
  app: Express;
  path = "/lobby";
  lobbyService = new LobbyService();

  constructor(app: Express) {
    this.app = app;
  }

  listenMethods() {
    this.httpGetMethods();
    this.httpPostMethods();
  }

  private httpGetMethods() {}

  private httpPostMethods() {
    // register user for match
    this.app.post(`${this.path}/register`, (req: Request, res: Response) => {
      try {
        this.lobbyService.registerUserLobby(req.body?.userId);

        res.send({ message: "registered" });
      } catch (e) {
        res.statusCode = 500;
        res.send({ error: "It was not possible to register now" });
      }
    });

    // unregister user
    this.app.post(`${this.path}/unregister`, (req: Request, res: Response) => {
      try {
        this.lobbyService.unregisterUserLobby(req.body?.userId);

        res.send({ message: "unregistered" });
      } catch (e) {
        res.statusCode = 500;
        res.send({ error: "It was not possible to register now" });
      }
    });

    //wainting for match
    this.app.post(`${this.path}/verify`, (req: Request, res: Response) => {
      try {
        const userId = req.body?.userId;
        const lobbyUser = this.lobbyService.getLobbyUser(req.body.userId);

        if (lobbyUser?.oponentUserId) {
          res.send({ message: "connecting" });
        } else {
          this.lobbyService.verifyLobby(userId);
          const lobbyOponent = this.lobbyService.checkOponent(userId);

          if (lobbyOponent) {
            res.send({ message: "connecting" });
          } else {
            res.send({ message: "waiting" });
          }
        }
      } catch (e) {
        res.statusCode = 500;
        res.send({ error: "It was not possible to register now" });
      }
    });
  }
}
