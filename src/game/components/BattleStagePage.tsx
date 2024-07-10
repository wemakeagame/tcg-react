import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Card, Flex } from "@radix-ui/themes";
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

export const BattleStagePage = () => {
    const user = useAuthData(true);
    const matchResponse = useBattleVerify(user?.id);
    const cardResponse = useGetApi<GCard[]>("http://localhost:5500/gcard");
    const [hand, setHand] = useState<(GCard | undefined)[]>([]);
    const [player, setPlayer] = useState<PlayerMatch>();
    const [canPlaceCard, setCanPlaceCard] = useState(false);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [isPlaceCardOptionsOpen, setIsPlaceCardOptionsOpen] = useState(false);
    const [placingCard, setPlacingCard] = useState<GCard>();
    const [placingCardBoardPosition, setPlacingCardBoardPosition] = useState<BoardCard['boardPostion']>(1);

    const [monsterBoard1, setMonsterBoard1] = useState<BoardMosterCard>();
    const [monsterBoard2, setMonsterBoard2] = useState<BoardMosterCard>();
    const [monsterBoard3, setMonsterBoard3] = useState<BoardMosterCard>();

    const [placeMosterCardResponse, setPlaceMosterCardBody] = usePostApi<{
        userId: User['id'],
        cardToPlace: BoardMosterCard
    }, { message: string }>("http://localhost:5500/match/place-monster-card")

    useEffect(() => {
        if (matchResponse) {
            setPlayer(matchResponse?.data?.player1?.userId === user?.id ? matchResponse?.data?.player1 : matchResponse?.data?.player2);

            if (matchResponse.data?.turn === user?.id) {
                setIsMyTurn(true);
                setCanPlaceCard(true);
            }

            if(cardResponse?.data && player?.monsters) {
                const monster1 = player.monsters.find(monster => monster.boardPostion === 1);

                if(monster1) {
                    monster1.gcard = cardResponse.data.find(card => card.id === monster1.gcardId);
                    setMonsterBoard1(monster1);
                }

                const monster2 = player.monsters.find(monster => monster.boardPostion === 2);

                if(monster2) {
                    monster2.gcard = cardResponse.data.find(card => card.id === monster2.gcardId);
                    setMonsterBoard2(monster2);
                }

                const monster3 = player.monsters.find(monster => monster.boardPostion === 3);

                if(monster3) {
                    monster3.gcard = cardResponse.data.find(card => card.id === monster3.gcardId);
                    setMonsterBoard3(monster3);
                }
            }
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
    }, [])

    const onPlaceMonsterCard = useCallback((monsterCard: BoardMosterCard) => {
        if (user?.id) {
            setPlaceMosterCardBody({
                cardToPlace: monsterCard,
                userId: user.id
            })
        }
    }, []);

    useEffect(() => {
        if(placeMosterCardResponse?.data?.message === 'ok') {
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

                <Flex flexGrow={'1'} justify={'between'} gap="2">

                </Flex>
                {player ? <Flex justify={'center'} style={{ maxHeight: "50px" }}>
                    {isMyTurn ? <TriangleDownIcon width={80} height={80} /> : null}
                    {!isMyTurn ? <TriangleUpIcon width={80} height={80} /> : null}
                </Flex> : null}

                <Flex flexGrow={'1'} justify={'between'} gap="2">
                    <BattleBoardCardSpot type={['monster', 'equipament']} onDrop={onDropCardStop} boardPosition={1} backCardUrl={user?.backCard} boardCard={monsterBoard1} />
                    <BattleBoardCardSpot type={['spell']} onDrop={onDropCardStop} boardPosition={1} backCardUrl={user?.backCard} />
                    <BattleBoardCardSpot type={['monster', 'equipament']} onDrop={onDropCardStop} boardPosition={2} backCardUrl={user?.backCard} boardCard={monsterBoard2}/>
                    <BattleBoardCardSpot type={['spell']} onDrop={onDropCardStop} boardPosition={2} backCardUrl={user?.backCard} />
                    <BattleBoardCardSpot type={['monster', 'equipament']} onDrop={onDropCardStop} boardPosition={3} backCardUrl={user?.backCard} boardCard={monsterBoard3}/>
                    <BattleBoardCardSpot type={['spell']} onDrop={onDropCardStop} boardPosition={3} backCardUrl={user?.backCard} />
                </Flex>

                <Flex flexGrow={'1'} justify={'between'} gap="2">
                    <Flex gap={'4'} style={{ background: "#4CAF50", padding: '10px' }}>
                        {hand.map(gcard => gcard && <GCardDnD gcard={gcard} isSelected={false} onSelect={(id) => id} canDrag={canPlaceCard} />)}
                    </Flex>
                    <Card style={{ flexGrow: '0.5' }}>Deck: {player?.deck?.length}</Card>
                </Flex>
            </Flex>
        </DndProvider>
    </Page>
};