import { Inject } from "@decorators/di";
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
              life: match.player1.life,
              handAmount: match.player1.hand.length,
              deckAmount: match.player1.deck.length,
            }, 
            player2: userId === match.player2.userId ? match.player2 : {
              monsters: match.player2.monsters,
              traps: match.player2.traps,
              userId: match.player2.userId,
              life: match.player2.life,
              handAmount: match.player2.hand.length,
              deckAmount: match.player2.deck.length,
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

    // set attack pahse
    this.app.post(`${this.path}/attack`, (req: Request, res: Response) => {
      try {
        const userId = req.body?.userId;
        this.matchService.passToAttackPhase(userId);

        res.send({ message: "changed to attack phase" });
      } catch (e) {
        res.statusCode = 500;
        res.send({ error: "It was not possible to verify connection" });
      }
    });

    //place monster
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

    //toggle position monster
    this.app.post(`${this.path}/toggle-monster-position`, (req: Request, res: Response) => {
      try {
        const userId = req.body?.userId;
        const cardToPlace = req.body?.cardToPlace as BoardMosterCard;
       

        if (userId && cardToPlace) {
          this.matchService.toggleMonsterPosition(userId, cardToPlace);
          res.send({ message: "ok" }); 
        } else {
          throw new Error("Something is wrong with this action");
        }
      } catch (e) {
        res.statusCode = 500;
        res.send({ error: "it was not possible to do this action" });
      }
    });


    //toggle position monster
    this.app.post(`${this.path}/reveal`, (req: Request, res: Response) => {
      try {
        const userId = req.body?.userId;
        const cardToPlace = req.body?.cardToPlace as BoardMosterCard;

        if (userId && cardToPlace) {
          this.matchService.revealCard(userId, cardToPlace);
          res.send({ message: "ok" }); 
        } else {
          throw new Error("Something is wrong with this action");
        }
      } catch (e) {
        res.statusCode = 500;
        res.send({ error: "it was not possible to do this action" });
      }
    });

    //resolve attack
    this.app.post(`${this.path}/resolve-attack`, (req: Request, res: Response) => {
      try {
        const userId = req.body?.userId;
        const attackingCard = req.body?.attackingCard as BoardMosterCard;
        const opponentAttackPosition = req.body?.opponentAttackPosition;

        if (userId && attackingCard) {
          const response = this.matchService.resolveAttack(userId, attackingCard, opponentAttackPosition);

          if(response) {
            res.send({ message: "ok" }); 
          }
          
        } else {
          throw new Error("Something is wrong with this action");
        }
      } catch (e) {
        res.statusCode = 500;
        console.error(e);
        res.send({ error: "it was not possible to do this action" });
      }
    });
  }
}
