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
import { BattleBoardCardSpot } from "./BattleBoardCardSpot";
import { DialogPlaceCard } from "./DialogPlaceCard";
import { User } from "../../user/model/user";
import { toast } from "react-toastify";
import { useUpdateBoard } from "../hooks/useUpdateBoard";
import { BattleBoard } from "./BattleBoard";

export const BattleStagePage = () => {
    const user = useAuthData(true);
    const matchResponse = useBattleVerify(user?.id);
    const cardResponse = useGetApi<GCard[]>("http://localhost:5500/gcard");
    const [, setPassTurnBody] = usePostApi<{userId: User['id']}, {message: string}>("http://localhost:5500/match/pass");
    const [hand, setHand] = useState<(GCard | undefined)[]>([]);
    const [player, setPlayer] = useState<PlayerMatch>();
    const [opponent, setOpponent] = useState<PlayerMatch>();
    const [canPlaceCard, setCanPlaceCard] = useState(false);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [isPlaceCardOptionsOpen, setIsPlaceCardOptionsOpen] = useState(false);
    const [placingCard, setPlacingCard] = useState<GCard>();
    const [placingCardBoardPosition, setPlacingCardBoardPosition] = useState<BoardCard['boardPostion']>(1);

    const {
        monsterBoard1,
        monsterBoard2,
        monsterBoard3,
        setMonsterBoard1,
        setMonsterBoard2,
        setMonsterBoard3
    } = useUpdateBoard(player, cardResponse?.data);

    const {
        monsterBoard1 : monsterBoardOpponent1,
        monsterBoard2 :monsterBoardOpponent2,
        monsterBoard3 : monsterBoardOpponent3,
        // setMonsterBoard1: setMonsterBoardOpponent1,
        // setMonsterBoard2: setMonsterBoardOpponent2,
        // setMonsterBoard3: setMonsterBoardOpponent3
    } = useUpdateBoard(opponent, cardResponse?.data);

     const [placeMosterCardResponse, setPlaceMosterCardBody] = usePostApi<{
        userId: User['id'],
        cardToPlace: BoardMosterCard
    }, { message: string }>("http://localhost:5500/match/place-monster-card")

    useEffect(() => {
        if (matchResponse) {
            setPlayer(matchResponse?.data?.player1?.userId === user?.id ? matchResponse?.data?.player1 : matchResponse?.data?.player2);
            setOpponent(matchResponse?.data?.player1?.userId === user?.id ? matchResponse?.data?.player2 : matchResponse?.data?.player1)
            const isMyTurnEval = matchResponse.data?.turn === user?.id;

            setIsMyTurn(isMyTurnEval);
            setCanPlaceCard(isMyTurnEval);

            
        }
    }, [matchResponse, cardResponse]);

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

    const passTurn = useCallback(() => {
        setPassTurnBody({userId: user?.id});
        setIsMyTurn(false);
        setCanPlaceCard(false);
    }, [])

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
        }
    }, [placingCardBoardPosition, user?.id, cardResponse?.data]);

    useEffect(() => {
        if (placeMosterCardResponse?.data?.message === 'ok') {
            toast("Placed card");
            const newHand = hand.filter(gcard => gcard?.id !== placingCard?.id);
            setHand(newHand);
        }
    }, [placeMosterCardResponse])

    return <Page>
        {placingCard ? <DialogPlaceCard
            open={isPlaceCardOptionsOpen}
            gcard={placingCard}
            boardPostion={placingCardBoardPosition}
            onPlaceMonsterCard={onPlaceMonsterCard}
            onClose={onClosePlaceCard}
        /> : null}
        <DndProvider backend={HTML5Backend}>
            <Flex direction={'column'} gap="2">
                <Flex justify={'end'}>
                    <Card>
                        deck: 99
                        hand: 99
                        life: 20
                    </Card>
                </Flex>

                {user && user.backCard && <BattleBoard 
                onDropCardStop={onDropCardStop}
                backCardUrl={user.backCard}
                monsterBoard1={monsterBoardOpponent1}
                monsterBoard2={monsterBoardOpponent2}
                monsterBoard3={monsterBoardOpponent3}
              />}
                {player ? <Flex justify={'center'} style={{ maxHeight: "50px" }}>
                    {isMyTurn ? <TriangleDownIcon width={80} height={80} /> : null}
                    {!isMyTurn ? <TriangleUpIcon width={80} height={80} /> : null}
                </Flex> : null}

              {user && user.backCard && <BattleBoard 
                onDropCardStop={onDropCardStop}
                backCardUrl={user.backCard}
                monsterBoard1={monsterBoard1}
                monsterBoard2={monsterBoard2}
                monsterBoard3={monsterBoard3}
              />}

                <Flex flexGrow={'1'} justify={'between'} gap="2">
                    <Flex gap={'4'} style={{ background: "#4CAF50", padding: '10px' }}>
                        {hand.map(gcard => gcard && <GCardDnD key={user?.username + gcard.id} gcard={gcard} isSelected={false} onSelect={(id) => id} canDrag={canPlaceCard} />)}
                    </Flex>
                    <Card style={{ flexGrow: '0.5' }}>
                        <Flex direction={"column"} justify="between" height={'100%'}>
                            <span>Deck: {player?.deck?.length}</span>
                            <Button onClick={() => passTurn()} disabled={!isMyTurn}>Pass turn</Button>
                        </Flex>
                    </Card>
                </Flex>
            </Flex>
        </DndProvider>
    </Page>
};