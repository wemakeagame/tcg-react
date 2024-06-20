import { useEffect } from "react";

export const useInterval = (interval: number, callBack: () => void) => {
    useEffect(() => {
        const intervalWaiting = setInterval(callBack, interval);
    
        return () => {
          clearInterval(intervalWaiting);
        };
      }, [interval, callBack]);
}