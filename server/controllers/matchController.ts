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
            player1: userId === match.player1.userId ? match.player1 : {
              monsters: match.player1.monsters,
              traps: match.player1.traps,
              userId: match.player1.userId,
            }, 
            player2: userId === match.player2.userId ? match.player2 : {
              monsters: match.player2.monsters,
              traps: match.player2.traps,
              userId: match.player2.userId,
            },
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

    // passing the turn
    this.app.post(`${this.path}/pass`, (req: Request, res: Response) => {
      try {
        const userId = req.body?.userId;
        this.matchService.passTurn(userId);

        res.send({ message: "turn passed" });
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
          res.send({ message: "ok" }); 
        } else {
          throw new Error("Something is wrong with this action");
        }
      } catch (e) {
        res.statusCode = 500;
        res.send({ error: "it was not possible to do this action" });
      }
    });
  }
}
