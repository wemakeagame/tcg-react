import { Link } from "react-router-dom";
import { Text, Flex, Button, Card } from "@radix-ui/themes";
import { Page } from "../../core/components/Page";
import { useGetApi } from "../../core/hooks/useApi";
import {
  Deck,
  GCard,
  GCardEquipament,
  GCardMonster,
  GCardSpell,
} from "../model/gcard";
import { useAuthData } from "../../user/hooks/useAuthData";
import { useEffect, useState } from "react";
import { GCardCompactView } from "./GCardCompact";

type DeckPreviewProps = {
  monstersCards: GCardMonster[];
  spellsCards: GCardSpell[];
  equipamentsCards: GCardEquipament[];
};

const DeckPreview: React.FC<DeckPreviewProps> = ({
  monstersCards,
  spellsCards,
  equipamentsCards,
}) => {
  const sizeGroup = "250px";
  return (
    <>
      <Text size={"2"}>Monsters</Text>

      <Flex
        direction={"column"}
        style={{ maxHeight: sizeGroup, overflow: "auto" }}
      >
        <Flex
          gap={"2"}
          direction={"column"}
          wrap={"nowrap"}
          style={{ background: "#CCCCCC", padding: "15px" }}
        >
          {monstersCards.map((card) => (
            <GCardCompactView gcard={card} />
          ))}
        </Flex>
      </Flex>

      <Text size={"2"}>Spells</Text>

      <Flex
        direction={"column"}
        gap={"2"}
        style={{ maxHeight: sizeGroup, overflow: "auto" }}
      >
        <Flex
          gap={"2"}
          direction={"column"}
          wrap={"nowrap"}
          style={{ background: "#CCCCCC", padding: "15px" }}
        >
          {spellsCards.map((card) => (
            <GCardCompactView gcard={card} />
          ))}
        </Flex>
      </Flex>
      <Text size={"2"}>Equipaments</Text>

      <Flex
        direction={"column"}
        gap={"2"}
        style={{ maxHeight: sizeGroup, overflow: "auto" }}
      >
        <Flex
          gap={"2"}
          direction={"column"}
          wrap={"nowrap"}
          style={{ background: "#CCCCCC", padding: "15px" }}
        >
          {equipamentsCards.map((card) => (
            <GCardCompactView gcard={card} />
          ))}
        </Flex>
      </Flex>
    </>
  );
};

function groupCards(cards: (GCard | undefined)[]) {
  const monsterCards: GCardMonster[] = [];
  const spellCards: GCardSpell[] = [];
  const equipamentCards: GCardEquipament[] = [];

  cards.forEach((card) => {
    if (card?.type === "monster") {
      monsterCards.push(card as GCardMonster);
    }
    if (card?.type === "spell") {
      spellCards.push(card as GCardSpell);
    }
    if (card?.type === "equipament") {
      equipamentCards.push(card as GCardEquipament);
    }
  });

  return {
    monsterCards,
    spellCards,
    equipamentCards,
  };
}

export const ManageDeckPage = () => {
  const userId = useAuthData();
  const deckResponse = useGetApi<Deck>(
    `http://localhost:5500/user/${userId}/deck`
  );

  const cardResponse = useGetApi<GCard[]>("http://localhost:5500/gcard");

  const [deckMonstersCards, setDeckMonstersCards] = useState<GCardMonster[]>(
    []
  );
  const [deckSpellsCards, setDeckSpellsCards] = useState<GCardSpell[]>([]);
  const [deckEquipamentsCards, setDeckEquipamentsCards] = useState<
    GCardEquipament[]
  >([]);

  const [userMonstersCards, setUserMonstersCards] = useState<GCardMonster[]>(
    []
  );
  const [userSpellsCards, setUserSpellsCards] = useState<GCardSpell[]>([]);
  const [userEquipamentsCards, setUserEquipamentsCards] = useState<
    GCardEquipament[]
  >([]);

  useEffect(() => {
    if (cardResponse && cardResponse.data) {
      const { monsterCards, spellCards, equipamentCards } = groupCards(
        cardResponse.data
      );
      setUserMonstersCards(monsterCards);
      setUserSpellsCards(spellCards);
      setUserEquipamentsCards(equipamentCards);
    }
  }, [cardResponse]);

  useEffect(() => {
    if(cardResponse?.data && deckResponse?.data) {
      const userCards = cardResponse.data;
      const cards = deckResponse.data.gcardIds.map(cardId => userCards.find(card => card.id === cardId));

       const { monsterCards, spellCards, equipamentCards } = groupCards(
        cards
      );

      setDeckMonstersCards(monsterCards);
      setDeckSpellsCards(spellCards);
      setDeckEquipamentsCards(equipamentCards);
    }

  }, [cardResponse, deckResponse])

  return (
    <Page>
      <Flex justify={"center"} align={"center"} direction={"column"}>
        <Flex justify={"between"} align={"center"} width={"100%"}>
          <Card style={{ margin: "10px" }}>
            <Flex justify={"between"} minWidth={"300px"}>
              <Flex direction={"column"} justify={"center"} align={"center"}>
                <strong>Monsters</strong>
                20 / 20
              </Flex>
              <Flex direction={"column"} justify={"center"} align={"center"}>
                <strong>Spells</strong>
                10 / 10
              </Flex>
              <Flex direction={"column"} justify={"center"} align={"center"}>
                <strong>Equipaments</strong>5 / 5
              </Flex>
            </Flex>
          </Card>
          <Link to={"/user"} style={{ alignSelf: "end", margin: "10px" }}>
            <Button>Back</Button>
          </Link>
        </Flex>

        <Flex
          style={{ width: "100%", marginTop: "15px" }}
          justify={"center"}
          align={"center"}
          gap={"3"}
        >
          <Card style={{ flexGrow: 1 }}>
            <Flex flexGrow={"1"} justify={"between"}>
              <Text weight={"bold"} size={"4"}>
                Deck
              </Text>
              <Text size={"2"}>min cards: 25</Text>
            </Flex>

            <DeckPreview
              monstersCards={deckMonstersCards}
              spellsCards={deckSpellsCards}
              equipamentsCards={deckEquipamentsCards}
            />
          </Card>
          <Flex flexGrow={"1"} direction={"column"} gap={"4"}>
            <Button> {`<---`} </Button>
            <Button> {`--->`} </Button>
          </Flex>
          <Card style={{ flexGrow: "1" }}>
            <Flex>
              <Text weight={"bold"} size={"4"}>
                Cards
              </Text>
            </Flex>

            <DeckPreview
              monstersCards={userMonstersCards}
              spellsCards={userSpellsCards}
              equipamentsCards={userEquipamentsCards}
            />
          </Card>
        </Flex>
      </Flex>
    </Page>
  );
};
