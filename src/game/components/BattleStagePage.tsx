import { Page } from "../../core/components/Page";
import { useAuthData } from "../../user/hooks/useAuthData";
import { useBattleVerify } from "../hooks/useBattleVerify";

export const BattleStagePage = () => {
    const user = useAuthData(true);
    const matchResponse = useBattleVerify(user?.id);
    
    return  <Page>
        {JSON.stringify(matchResponse)}
        Aqui vai o tabuleiro
    </Page>
};