import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import { Card, Flex } from "@radix-ui/themes";
import { useCallback, useEffect, useState } from "react";
import { GCard } from "../../card/model/gcard";
import { Page } from "../../core/components/Page";
import { useGetApi } from "../../core/hooks/useApi";
import { useAuthData } from "../../user/hooks/useAuthData";
import { useBattleVerify } from "../hooks/useBattleVerify";
import { PlayerMatch } from "../models/match";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GCardDnD } from "../../card/components/GCardDnD";
import { BattleBoardCardSpot } from "./BattleBoardCardSpot";

export const BattleStagePage = () => {
    const user = useAuthData(true);
    const matchResponse = useBattleVerify(user?.id);
    const cardResponse = useGetApi<GCard[]>("http://localhost:5500/gcard");
    const [hand, setHand] = useState<(GCard | undefined)[]>([]);
    const [player, setPlayer] = useState<PlayerMatch>();
    const [canPlaceCard, setCanPlaceCard] = useState(false);
    const [isMyTurn, setIsMyTurn] = useState(false);

    useEffect(() => {
        if (matchResponse) {
            setPlayer(matchResponse?.data?.player1?.userId === user?.id ? matchResponse?.data?.player1 : matchResponse?.data?.player2);

            if(matchResponse.data?.turn === user?.id) {
                setIsMyTurn(true);
                setCanPlaceCard(true);
            }
        }
    }, [matchResponse]);

    useEffect(() => {
        if (player?.hand && cardResponse?.data) {
            const handCards = player?.hand.map(id => cardResponse?.data?.find(card => card.id === id));
            if (handCards.length) {
                setHand(handCards);
            }
        }
    }, [cardResponse, player?.hand]);


    const onDropCardStop = useCallback((gcard: GCard) => {
        console.log(gcard);
    }, []);

    return <Page>
        <DndProvider backend={HTML5Backend}>
            <Flex direction={'column'} gap="4">
                <Flex justify={'end'}>
                    deck: 99
                    hand: 99
                    life: 20
                </Flex>
                <Flex flexGrow={'1'}>
                    board opponet
                </Flex>
                {player ? <Flex justify={'center'} gap="2">
                    <ThickArrowDownIcon width={30} height={30} color={isMyTurn ? 'red' : 'gray' } />
                    <ThickArrowUpIcon width={30} height={30} color={!isMyTurn ? 'red' : 'gray' } />
                </Flex> : null}

                <Flex flexGrow={'1'} justify={'between'} gap="2">
                    <BattleBoardCardSpot type={['monster', 'equipament']} onDrop={onDropCardStop} />
                    <BattleBoardCardSpot type={['spell']} onDrop={onDropCardStop} />
                    <BattleBoardCardSpot type={['monster', 'equipament']} onDrop={onDropCardStop} />
                    <BattleBoardCardSpot type={['spell']} onDrop={onDropCardStop} />
                    <BattleBoardCardSpot type={['monster', 'equipament']} onDrop={onDropCardStop} />
                    <BattleBoardCardSpot type={['spell']} onDrop={onDropCardStop} />
                </Flex>

                <Flex flexGrow={'1'} justify={'between'} gap="4">
                    <Flex gap={'2'} style={{ background: "#4CAF50", padding: '10px' }}>
                        {hand.map(gcard => gcard && <GCardDnD gcard={gcard} isSelected={false} onSelect={(id) => id} canDrag={canPlaceCard} />)}
                    </Flex>
                    <Card style={{ flexGrow: '0.5' }}>Deck: {player?.deck.length}</Card>
                </Flex>
            </Flex>
        </DndProvider>
    </Page>
};