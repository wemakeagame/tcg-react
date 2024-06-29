import { Card, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { GCardView } from "../../card/components/GCard";
import { GCard } from "../../card/model/gcard";
import { Page } from "../../core/components/Page";
import { useGetApi } from "../../core/hooks/useApi";
import { useAuthData } from "../../user/hooks/useAuthData";
import { useBattleVerify } from "../hooks/useBattleVerify";
import { PlayerMatch } from "../models/match";

export const BattleStagePage = () => {
    const user = useAuthData(true);
    const matchResponse = useBattleVerify(user?.id);
    const cardResponse = useGetApi<GCard[]>("http://localhost:5500/gcard");
    const [hand, setHand] = useState<(GCard | undefined)[]>([]);
    const [player, setPlayer] = useState<PlayerMatch>();

    useEffect(() => {
        if (matchResponse) {
            setPlayer(matchResponse?.data?.player1?.userId === user?.id ? matchResponse?.data?.player1 : matchResponse?.data?.player2);
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

    return <Page>
        <Flex direction={'column'}>
            <Flex justify={'end'}>
                deck: 99
                hand: 99
                life: 20
            </Flex>
            <Flex flexGrow={'1'}>
                board opponet
            </Flex>
            <Flex>
                Indicators
            </Flex>

            <Flex>
                board player
            </Flex>

            <Flex flexGrow={'1'} justify={'between'}>
                <Flex>
                    {hand.map(gcard => gcard && <GCardView gcard={gcard} isSelected={false} onSelect={(id) => id} />)}
                </Flex>
                <Flex> Menu
                    <Card>Deck: {player?.deck.length}</Card>
                </Flex>
            </Flex>
        </Flex>
    </Page>
};