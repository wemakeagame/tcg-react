import { usePostApi } from "../../core/hooks/useApi";
import { useInterval } from "../../core/hooks/useInterval";
import { ChatMessage } from "../../user/components/UserChat";
import { PlayerMatch } from "../models/match";

export const useBattleVerify = (userId: string | undefined) => {
    const [matchResponse, setVerifyRequest] = usePostApi<
        { userId: string },
        { chat?: ChatMessage[]; message?: string, player1?: PlayerMatch, player2?: PlayerMatch  }
    >("http://localhost:5500/match/verify");

    useInterval(2000, () => {
        if (userId) {
            setVerifyRequest({
                userId: userId,
            });
        }
    });

    return matchResponse;
}