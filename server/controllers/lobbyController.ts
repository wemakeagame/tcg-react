import { Inject } from "@decorators/di";
import { Express, Request, Response } from "express";
import { LobbyService } from "../services/lobbyService";
import { MatchController } from "./matchController";

export class LobbyController {
  path = "/lobby";

  constructor(
    @Inject('app') private app: Express, 
    @Inject('MatchController') private matchController: MatchController, 
    @Inject('LobbyService') private lobbyService: LobbyService) {
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
            if(lobbyOponent.oponentUserId) {
                this.matchController.registerMatch(lobbyOponent.oponentUserId, lobbyOponent.userId);
            }
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
