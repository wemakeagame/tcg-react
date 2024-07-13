import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePostApi } from "../../core/hooks/useApi";
import { useInterval } from "../../core/hooks/useInterval";
import { MatchResponseData } from "../models/match";

export const useBattleVerify = (userId: string | undefined) => {
    const navigate = useNavigate();
    const [matchResponse, setVerifyRequest] = usePostApi<
        { userId: string },
        MatchResponseData
    >("http://localhost:5500/match/verify");

    useInterval(2000, () => {
        if (userId) {
            setVerifyRequest({
                userId: userId,
            });
        }
    });

    useEffect(() => {
        if (matchResponse?.data?.message === "disconnected") {
          toast("The other player disconnected...");
          const timeoutToRedirect = setTimeout(() => {
            navigate("/waiting-battle");
          }, 2000)
    
          return () => clearTimeout(timeoutToRedirect);
        }
      }, [matchResponse]);

    return matchResponse;
}