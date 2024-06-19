import DateDiff from "date-diff";
import { useEffect, useState } from "react";
import { Text } from "@radix-ui/themes";

type TimerProps = {
  initialDate: Date;
  interval: number;
};

export const Timer: React.FC<TimerProps> = ({ initialDate, interval }) => {
  const [initDate] = useState(initialDate);
  const [timeWaiting, setTimeWaiting] = useState<string>("00:00");

  useEffect(() => {
    const intervalWaiting = setInterval(() => {
        const diff = new DateDiff(new Date(), initDate);
    
        const newDate: string[] = [];
    
        const totalSeconds = diff.seconds().toFixed();
        const seconds = +totalSeconds % 60;
        const minutes = ((+totalSeconds - seconds) / 60);
    
        newDate.push(minutes.toString().length < 2? "0" + minutes : minutes.toString() );
        newDate.push(seconds.toString().length < 2? "0" + seconds : seconds.toString() );
    
        setTimeWaiting(newDate.join(':'));
      }, interval);

    return () => {
      clearInterval(intervalWaiting);
    };
  }, [initDate, interval]);

  return (
    <Text size={"6"} weight={"bold"}>
      {timeWaiting}
    </Text>
  );
};
