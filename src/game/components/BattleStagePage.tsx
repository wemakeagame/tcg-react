import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex } from "@radix-ui/themes";
import { useCallback, useEffect, useState } from "react";
import { GCard } from "../../card/model/gcard";
import { Page } from "../../core/components/Page";
import { useGetApi, usePostApi } from "../../core/hooks/useApi";
import { useAuthData } from "../../user/hooks/useAuthData";
import { useBattleVerify } from "../hooks/useBattleVerify";
import { BoardCard, BoardMosterCard, PlayerMatch } from "../models/match";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GCardDnD } from "../../card/components/GCardDnD";
import { DialogPlaceCard } from "./DialogPlaceCard";
import { User } from "../../user/model/user";
import { toast } from "react-toastify";
import { useUpdateBoard } from "../hooks/useUpdateBoard";
import { BattleBoard } from "./BattleBoard";
import { DialogMonsterBoardActions } from "./DialogMonsterBoardActions";

export const BattleStagePage = () => {
    const user = useAuthData(true);
    const matchResponse = useBattleVerify(user?.id);
    const cardResponse = useGetApi<GCard[]>("http://localhost:5500/gcard");
    const [, setPassTurnBody] = usePostApi<{ userId: User['id'] }, { message: string }>("http://localhost:5500/match/pass");
    const [, setPassAttackPhaseBody] = usePostApi<{ userId: User['id'] }, { message: string }>("http://localhost:5500/match/attack");
    const [hand, setHand] = useState<(GCard | undefined)[]>([]);
    const [player, setPlayer] = useState<PlayerMatch>();
    const [opponent, setOpponent] = useState<PlayerMatch>();
    const [canPlaceCard, setCanPlaceCard] = useState(false);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [isPlaceCardOptionsOpen, setIsPlaceCardOptionsOpen] = useState(false);
    const [placingCard, setPlacingCard] = useState<GCard>();
    const [actionsMonsterCard, setActionsMonsterCard] = useState<BoardMosterCard>();
    const [placingCardBoardPosition, setPlacingCardBoardPosition] = useState<BoardCard['boardPostion']>(1);
    const [attackingCard, setAttackingCard] = useState<BoardMosterCard>();

    const {
        monsterBoard1,
        monsterBoard2,
        monsterBoard3,
        setMonsterBoard1,
        setMonsterBoard2,
        setMonsterBoard3
    } = useUpdateBoard(player, cardResponse?.data);

    const {
        monsterBoard1: monsterBoardOpponent1,
        monsterBoard2: monsterBoardOpponent2,
        monsterBoard3: monsterBoardOpponent3,
    } = useUpdateBoard(opponent, cardResponse?.data);

    const [placeMosterCardResponse, setPlaceMosterCardBody] = usePostApi<{
        userId: User['id'],
        cardToPlace: BoardMosterCard
    }, { message: string }>("http://localhost:5500/match/place-monster-card");

    const [, setTogglePositionMonster] = usePostApi<{
        userId: User['id'],
        cardToPlace: BoardMosterCard
    }, { message: string }>("http://localhost:5500/match/toggle-monster-position")

    const [, setRevealMonster] = usePostApi<{
        userId: User['id'],
        cardToPlace: BoardMosterCard
    }, { message: string }>("http://localhost:5500/match/reveal")

    const [attackResponse, setAttackBody] = usePostApi<{
        userId: User['id'],
        attackingCard: BoardMosterCard,
        opponentAttackPosition?: number
    }, { message: string }>("http://localhost:5500/match/resolve-attack")

    useEffect(() => {
        if (matchResponse) {
            setPlayer(matchResponse?.data?.player1?.userId === user?.id ? matchResponse?.data?.player1 : matchResponse?.data?.player2);
            setOpponent(matchResponse?.data?.player1?.userId === user?.id ? matchResponse?.data?.player2 : matchResponse?.data?.player1)
            const isMyTurnEval = matchResponse.data?.turn === user?.id;

            setIsMyTurn(isMyTurnEval);
            setCanPlaceCard(isMyTurnEval && !player?.hasPlacedMonster && player?.phase === 'maintenance');
        }
    }, [matchResponse, cardResponse, player?.hasPlacedMonster]);

    useEffect(() => {
        if (player?.hand && cardResponse?.data) {
            const handCards = player?.hand.map(id => cardResponse?.data?.find(card => card.id === id));
            if (handCards.length) {
                setHand(handCards);
            }
        }
    }, [cardResponse, player?.hand]);

    const onDropCardStop = useCallback((gcard: GCard, boardPosition: BoardCard['boardPostion']) => {
        setPlacingCard(gcard);
        setIsPlaceCardOptionsOpen(true);
        setPlacingCardBoardPosition(boardPosition);
    }, []);

    const onClosePlaceCard = useCallback(() => {
        setIsPlaceCardOptionsOpen(false);
    }, []);

    const onCloseMonsterActions = useCallback(() => {
        setActionsMonsterCard(undefined);
    }, []);

    const passTurn = useCallback(() => {
        setPassTurnBody({ userId: user?.id });
        setIsMyTurn(false);
        setCanPlaceCard(false);
    }, []);


    const canAttack = useCallback(() => {
        return isMyTurn && player?.monsters.some(m => m.canAttack) && player.phase === 'maintenance';
    }, [isMyTurn, player]);

    const passPhase = useCallback(() => {
        if (canAttack()) {
            setPassAttackPhaseBody({ userId: user?.id });
            if (player) {
                player.phase = 'attack';
                setPlayer(player);
                setCanPlaceCard(false);
            }

        } else {
            passTurn();
            setAttackingCard(undefined);
        }

    }, [user?.id, player]);

    const onPlaceMonsterCard = useCallback((monsterCard: BoardMosterCard) => {
        if (user?.id) {
            setPlaceMosterCardBody({
                cardToPlace: monsterCard,
                userId: user.id
            });

            if (cardResponse?.data) {
                monsterCard.gcard = cardResponse.data.find(card => card.id === monsterCard.gcardId);
                if (placingCardBoardPosition === 1) {
                    setMonsterBoard1(monsterCard);
                } else if (placingCardBoardPosition === 2) {
                    setMonsterBoard2(monsterCard);
                } else if (placingCardBoardPosition === 3) {
                    setMonsterBoard3(monsterCard);
                }
            }

            setCanPlaceCard(false);
            toast("Placed card");
        }
    }, [placingCardBoardPosition, user?.id, cardResponse?.data]);


    const onSelectMonster = useCallback((boardMosterCard?: BoardMosterCard) => {
        if (isMyTurn) {
            setActionsMonsterCard(boardMosterCard);
        }
    }, [isMyTurn]);

    const onSelectOpponentMonster = useCallback((boardMosterCard?: BoardMosterCard) => {
        if (isMyTurn) {
            // TODO when attack check the oponent card
        }
    }, [isMyTurn]);

    const updateCardOnBoard = useCallback((targetCard: BoardMosterCard) => {
        if (targetCard) {
            if (targetCard.boardPostion === 1) {
                setMonsterBoard1({ ...targetCard });
            }

            if (targetCard.boardPostion === 2) {
                setMonsterBoard2({ ...targetCard });
            }

            if (targetCard.boardPostion === 3) {
                setMonsterBoard3({ ...targetCard });
            }
        }
    }, [actionsMonsterCard]);

    const toggleBattlePosition = useCallback(() => {
        if (actionsMonsterCard && user) {
            const nextPosition = actionsMonsterCard.position === 'attack' ? 'defense' : 'attack';
            toast(`Changed from ${actionsMonsterCard.position} to ${nextPosition}`)
            actionsMonsterCard.position = nextPosition;
            setTogglePositionMonster({
                userId: user.id,
                cardToPlace: actionsMonsterCard
            });

            updateCardOnBoard(actionsMonsterCard);
            setActionsMonsterCard(undefined);
        }
    }, [actionsMonsterCard, user, updateCardOnBoard]);


    const attackCard = useCallback(() => {
        if (actionsMonsterCard && user) {
            const hasOpponentMonster = monsterBoardOpponent1?.gcard || monsterBoardOpponent2?.gcard || monsterBoardOpponent3?.gcard;
            if (hasOpponentMonster) {
                toast(`Please select the target`);
                setAttackingCard(actionsMonsterCard);
            } else {
                setAttackBody({
                    userId: user.id,
                    attackingCard: actionsMonsterCard,
                })
            }

            actionsMonsterCard.canAttack = false;
            updateCardOnBoard(actionsMonsterCard)

            setActionsMonsterCard(undefined);
        }
    }, [actionsMonsterCard, user, updateCardOnBoard]);


    const revealCard = useCallback(() => {
        if (actionsMonsterCard && user) {
            toast(`you revelead ${actionsMonsterCard.gcard?.name}`)
            actionsMonsterCard.revelead = true;
            setRevealMonster({
                userId: user.id,
                cardToPlace: actionsMonsterCard
            });

            updateCardOnBoard(actionsMonsterCard)
            setActionsMonsterCard(undefined);
        }
    }, [actionsMonsterCard, user, updateCardOnBoard]);

    useEffect(() => {
        if (placeMosterCardResponse?.data?.message === 'ok') {

            const newHand = hand.filter(gcard => gcard?.id !== placingCard?.id);
            setHand(newHand);
        }
    }, [placeMosterCardResponse]);

    return <Page>
        {placingCard ? <DialogPlaceCard
            open={isPlaceCardOptionsOpen}
            gcard={placingCard}
            boardPostion={placingCardBoardPosition}
            onPlaceMonsterCard={onPlaceMonsterCard}
            onClose={onClosePlaceCard}
        /> : null}

        {actionsMonsterCard && player && !attackingCard ? <DialogMonsterBoardActions
            open={!!actionsMonsterCard}
            boardCard={actionsMonsterCard}
            phase={player.phase}
            reveal={revealCard}
            attack={attackCard}
            toggleBattlePosition={toggleBattlePosition}
            onClose={onCloseMonsterActions}
        /> : null}

        <DndProvider backend={HTML5Backend}>
            <Flex direction={'column'} gap="2">
                <Flex justify={'end'}>
                    {opponent && <Card style={{ display: 'flex', justifyContent: 'space-between', minWidth: '300px' }}>
                        <span>Deck: {`${opponent?.deckAmount}`}</span>
                        <span>Hand: {`${opponent?.handAmount}`}</span>
                        <span>Life: {`${opponent?.life}`}</span>
                    </Card>}
                </Flex>

                {user && user.backCard && opponent && <BattleBoard
                    onSelectMonster={onSelectOpponentMonster}
                    onDropCardStop={onDropCardStop}
                    backCardUrl={user.backCard}
                    monsterBoard1={monsterBoardOpponent1}
                    monsterBoard2={monsterBoardOpponent2}
                    monsterBoard3={monsterBoardOpponent3}
                    phase={opponent.phase}
                    isMyTurn={isMyTurn}
                    blink={!!attackingCard}
                />}
                {player ? <Flex justify={'center'} style={{ maxHeight: "50px" }}>
                    {isMyTurn ? <TriangleDownIcon width={80} height={80} /> : null}
                    {!isMyTurn ? <TriangleUpIcon width={80} height={80} /> : null}
                </Flex> : null}

                {user && user.backCard && player && <BattleBoard
                    onSelectMonster={onSelectMonster}
                    onDropCardStop={onDropCardStop}
                    backCardUrl={user.backCard}
                    monsterBoard1={monsterBoard1}
                    monsterBoard2={monsterBoard2}
                    monsterBoard3={monsterBoard3}
                    phase={player.phase}
                    isMyTurn={isMyTurn}
                    blink={false}
                />}

                <Flex flexGrow={'1'} justify={'between'} gap="2">
                    <Flex gap={'4'} style={{ background: "#4CAF50", padding: '10px' }}>
                        {hand.map(gcard => gcard && <GCardDnD
                            key={user?.username + gcard.id}
                            gcard={gcard} isSelected={false}
                            onSelect={(id) => id}
                            canDrag={canPlaceCard}
                        />)}
                    </Flex>
                    <Card style={{ flexGrow: '0.5' }}>
                        <Flex direction={"column"} justify="between" height={'100%'}>
                            <span>Deck: {player?.deck?.length}</span>
                            <span>Life: {player?.life}</span>
                            <Button onClick={passPhase} disabled={!isMyTurn}>{!canAttack() ? "Pass turn" : "Attack"}</Button>
                        </Flex>
                    </Card>
                </Flex>
            </Flex>
        </DndProvider>
    </Page>
};