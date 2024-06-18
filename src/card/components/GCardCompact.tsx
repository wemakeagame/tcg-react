import { GCardEquipament, GCardMonster, GCardSpell } from "../model/gcard";
import { Card, Flex, Text } from "@radix-ui/themes";
import {
  HeartFilledIcon,
  LightningBoltIcon,
  StarFilledIcon,
  TargetIcon,
} from "@radix-ui/react-icons";
import {
  GCardEquipamentViewProps,
  GCardMonsterViewProps,
  GCardSpellViewProps,
  GCardViewBaseProps,
  GCardViewProps,
  colorMap,
  getBackgroundCard,
} from "./GCard";

export const GCardCompactViewBase: React.FC<GCardViewBaseProps> = ({
  children,
  gcard,
  onSelect,
  isSelected,
}) => {
  const color = getBackgroundCard(gcard.color);
  const outline = isSelected ? `4px solid red` : "";

  return (
    <Card
      style={{ height: "70px", background: color, outline: outline, minWidth:"400px" }}
      onClick={() => onSelect(gcard.id)}
    >
      <Card>
        <Flex justify={"between"}>
          <Text size={"4"} weight={"bold"}>
            {gcard.name} 
            <Text size={"1"}> {gcard.rarity}</Text>
          </Text>
          <Flex
            style={{
              background: "#dfd5d5",
              padding: "2px",
              borderRadius: "5px",
              border: `1px solid #cccccc}`,
            }}
            align={"center"}
          >
            {gcard.color.map((color) => (
              <StarFilledIcon color={colorMap[color]} />
            ))}
          </Flex>
          {children}
        </Flex>
      </Card>
    </Card>
  );
};

export const GCardMonsterCompactView: React.FC<GCardMonsterViewProps> = ({
  gcard,
  isSelected,
  onSelect,
}) => {
  return (
    <GCardCompactViewBase
      gcard={gcard}
      isSelected={isSelected}
      onSelect={onSelect}
    >
      <Text size={"6"}>
        <LightningBoltIcon /> {gcard.power}
      </Text>
      <Text size={"6"}>
        <HeartFilledIcon /> {gcard.life}
      </Text>
    </GCardCompactViewBase>
  );
};

export const GCardSpellCompactView: React.FC<GCardSpellViewProps> = ({
  gcard,
  isSelected,
  onSelect,
}) => {
  return (
    <GCardCompactViewBase
      gcard={gcard}
      isSelected={isSelected}
      onSelect={onSelect}
    >
      <Text size={"6"} weight={"bold"}>
        <TargetIcon /> {gcard.spell}
      </Text>
    </GCardCompactViewBase>
  );
};

export const GCardEquipamentCompactView: React.FC<GCardEquipamentViewProps> = ({
  gcard,
  isSelected,
  onSelect,
}) => {
  return (
    <GCardCompactViewBase
      gcard={gcard}
      isSelected={isSelected}
      onSelect={onSelect}
    >
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

export const GCardCompactView: React.FC<GCardViewProps> = ({
  gcard,
  isSelected,
  onSelect,
}) => {
  if (gcard.type === "monster") {
    return (
      <GCardMonsterCompactView
        gcard={gcard as GCardMonster}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    );
  }

  if (gcard.type === "equipament") {
    return (
      <GCardEquipamentCompactView
        gcard={gcard as GCardEquipament}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    );
  }

  if (gcard.type === "spell") {
    return (
      <GCardSpellCompactView
        gcard={gcard as GCardSpell}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    );
  }

  return null;
};
