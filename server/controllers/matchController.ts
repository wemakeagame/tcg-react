import { Inject, Injectable } from "@decorators/di";
import { Express, Request, Response } from "express";
import { BoardMosterCard } from "../repositories/matchRepository";
import { MatchService } from "../services/matchService";
import { UserService } from "../services/userService";

export class MatchController {
  path = "/match";

  constructor(
    @Inject('app') private app: Express, 
    @Inject('UserService') private userService: UserService,
    @Inject('MatchService') private matchService: MatchService,
  ) {
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
          res.send({ 
            chat: match.chat, 
            player1: userId === match.player1.userId ? match.player1 : null, 
            player2: userId === match.player2.userId ? match.player2 : null,
            turn: match.turn
          });
          this.matchService.verifyConnection(userId);
        } else {
          res.send({ message: "disconnected" });
        }
      } catch (e) {
        res.statusCode = 500;
        res.send({ error: "It was not possible to verify connection" });
      }
    });

    //wainting for match
    this.app.post(`${this.path}/place-monster-card`, (req: Request, res: Response) => {
      try {
        const userId = req.body?.userId;
        const cardToPlace = req.body?.cardToPlace as BoardMosterCard;
       

        if (userId && cardToPlace) {
          this.matchService.placeMonsterCard(userId, cardToPlace);
        } else {
          res.send({ message: "disconnected" });
        }
      } catch (e) {
        res.statusCode = 500;
        res.send({ error: "It was not possible to verify connection" });
      }
    });
  }
}
