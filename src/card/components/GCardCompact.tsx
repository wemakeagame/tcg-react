import {
  GCardEquipament,
  GCardMonster,
  GCardSpell,
} from "../model/gcard";
import { Card, Flex, Text } from "@radix-ui/themes";
import { HeartFilledIcon, LightningBoltIcon, TargetIcon } from "@radix-ui/react-icons";
import { GCardEquipamentViewProps, GCardMonsterViewProps, GCardSpellViewProps, GCardViewBaseProps, GCardViewProps, getBackgroundCard } from "./GCard";


export const GCardCompactViewBase: React.FC<GCardViewBaseProps> = ({
  children,
  gcard,
}) => {
  const color = getBackgroundCard(gcard.color);

  return (
    <Card style={{ height:"70px" , background: color }}>
      <Card>
        <Flex justify={"between"}>
          <Text size={"4"} weight={"bold"}>
            {gcard.name}
          </Text>
          <Text size={"1"}>{gcard.rarity}</Text>
          {children}
        </Flex>
      </Card>
    </Card>
  );
};


export const GCardMonsterCompactView: React.FC<GCardMonsterViewProps> = ({
  gcard,
}) => {
  return (
    <GCardCompactViewBase gcard={gcard}>
          <Text size={"6"}>
            <LightningBoltIcon /> {gcard.power}
          </Text>
          <Text size={"6"}>
            <HeartFilledIcon /> {gcard.life}
          </Text>
    </GCardCompactViewBase>
  );
};

export const GCardSpellCompactView: React.FC<GCardSpellViewProps> = ({ gcard }) => {
  return (
    <GCardCompactViewBase gcard={gcard}>
         <Text size={"6"} weight={'bold'}>
            <TargetIcon /> {gcard.spell}
          </Text>
    </GCardCompactViewBase>
  );
};

export const GCardEquipamentCompactView: React.FC<GCardEquipamentViewProps> = ({
  gcard,
}) => {
  return (
    <GCardCompactViewBase gcard={gcard}>
      <Flex justify={"between"}>
        {gcard.power && (
          <Text size={"6"}>
            <LightningBoltIcon /> {gcard.power}
          </Text>
        )}
        {gcard.life && (
          <Text size={"6"}>
            <HeartFilledIcon /> {gcard.life}
          </Text>
        )}
      </Flex>
    </GCardCompactViewBase>
  );
};

export const GCardCompactView: React.FC<GCardViewProps> = ({ gcard }) => {
  if (gcard.type === "monster") {
    return <GCardMonsterCompactView gcard={gcard as GCardMonster}></GCardMonsterCompactView>;
  }

  if (gcard.type === "equipament") {
    return (
      <GCardEquipamentCompactView
        gcard={gcard as GCardEquipament}
      ></GCardEquipamentCompactView>
    );
  }

  if (gcard.type === "spell") {
    return <GCardSpellCompactView gcard={gcard as GCardSpell}></GCardSpellCompactView>;
  }

  return null;
};
