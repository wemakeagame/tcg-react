import { Container } from "@decorators/di";
import { LobbyController } from "../controllers/lobbyController";
import { MatchController} from "../controllers/matchController";
import { LobbyService } from "../services/lobbyService";
import {Express} from 'express';
import { UserService } from "../services/userService";
import { MatchService } from "../services/matchService";
import { MatchRepository } from "../repositories/matchRepository";
import { UserController } from "../controllers/userController";
import { UserRepository } from "../repositories/userRespository";
import { LobbyRepository } from "../repositories/lobbyRepository";
import { GCardController } from "../controllers/gcardController";
import { GcardService } from "../services/gcardService";
import { GCardRepository } from "../repositories/gcardRepository";
import { DeckService } from "../services/deckService";
import { DeckRepository } from "../repositories/deckRepository";

export async function bootstrap(app: Express) {

    const container = new Container();

    container.provide([
        {
            provide: 'app',
            useValue: app
        },
        {
            provide: 'LobbyController',
            useClass: LobbyController,
        },
        {
            provide: 'LobbyService',
            useClass: LobbyService,
        },
        {
            provide: 'LobbyRepository',
            useClass: LobbyRepository
        },
        {
            provide: 'MatchController',
            useClass: MatchController,
        },
        {
            provide: 'MatchService',
            useClass: MatchService,
        },
        {
            provide: 'MatchRepository',
            useClass: MatchRepository,
        },
        {
            provide: 'UserController',
            useClass: UserController,
        },
        {
            provide: 'UserService',
            useClass: UserService,
        },
        {
            provide: 'UserRepository',
            useClass: UserRepository,
        },
        {
            provide: 'GCardController',
            useClass: GCardController,
        },
        {
            provide: 'GcardService',
            useClass: GcardService,
        },
        {
            provide: 'GCardRepository',
            useClass: GCardRepository,
        },
        {
            provide: 'DeckService',
            useClass: DeckService,
        },
        {
            provide: 'DeckRepository',
            useClass: DeckRepository,
        }
    ]);

    const lobbyController = await container.get<LobbyController>('LobbyController');
    const userController = await container.get<UserController>('UserController');
    const gcardController = await container.get<GCardController>('GCardController');
    const matchController = await container.get<MatchController>('MatchController');
    lobbyController.listenMethods();
    userController.listenMethods();
    gcardController.listenMethods();
    matchController.listenMethods();

  }
  

