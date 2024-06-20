/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import { Text, Flex, Button, Card } from "@radix-ui/themes";
import { Page } from "../../core/components/Page";
import { useGetApi, usePostApi } from "../../core/hooks/useApi";
import {
  Deck,
  GCard,
  GCardEquipament,
  GCardMonster,
  GCardSpell,
} from "../model/gcard";
import { useAuthData } from "../../user/hooks/useAuthData";
import { useCallback, useEffect, useState } from "react";
import { GCardCompactView } from "./GCardCompact";
import { toast } from "react-toastify";

type DeckPreviewProps = {
  monstersCards: GCardMonster[];
  spellsCards: GCardSpell[];
  equipamentsCards: GCardEquipament[];
  selectedCardId: string | undefined;
  onSelectCard: (cardId: string) => void;
};

const DeckPreview: React.FC<DeckPreviewProps> = ({
  monstersCards,
  spellsCards,
  equipamentsCards,
  selectedCardId,
  onSelectCard,
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
            <GCardCompactView
              gcard={card}
              isSelected={selectedCardId === card.id}
              onSelect={onSelectCard}
            />
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
            <GCardCompactView
              gcard={card}
              isSelected={selectedCardId === card.id}
              onSelect={onSelectCard}
            />
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
            <GCardCompactView
              gcard={card}
              isSelected={selectedCardId === card.id}
              onSelect={onSelectCard}
            />
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
  const user = useAuthData(true);
  const deckResponse = useGetApi<Deck>(
    `http://localhost:5500/user/${user?.id}/deck`
  );

  const cardResponse = useGetApi<GCard[]>("http://localhost:5500/gcard");
  const [addCardResponse, setAddCardBody] = usePostApi<{userId: string, gcardId: string}, {message: string}>(
    "http://localhost:5500/user/addCardDeck"
  );
  const [removeCardResponse, setRemoveCardBody] = usePostApi<{userId: string, gcardId: string}, {message: string}>(
    "http://localhost:5500/user/removeCardDeck"
  );
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
  const [selectedCardId, setSelectedCardId] = useState<string>();

  const updateView = useCallback(() => {
    if (cardResponse && cardResponse.data) {
      const { monsterCards, spellCards, equipamentCards } = groupCards(
        cardResponse.data
      );

      if (deckResponse?.data) {
        const deckCardsIds = deckResponse.data.gcardIds;
        const filteredAddedMosterCards = monsterCards.filter(
          (card) => !deckCardsIds.includes(card.id)
        );
        const filteredAddedSpellCards = spellCards.filter(
          (card) => !deckCardsIds.includes(card.id)
        );
        const filteredAddedEquipCards = equipamentCards.filter(
          (card) => !deckCardsIds.includes(card.id)
        );

        setUserMonstersCards(filteredAddedMosterCards);
        setUserSpellsCards(filteredAddedSpellCards);
        setUserEquipamentsCards(filteredAddedEquipCards);
      }
    }

    if (cardResponse?.data && deckResponse?.data) {
      const userCards = cardResponse.data;
      const cards = deckResponse.data.gcardIds.map((cardId) =>
        userCards.find((card) => card.id === cardId)
      );

      const { monsterCards, spellCards, equipamentCards } = groupCards(cards);

      setDeckMonstersCards(monsterCards);
      setDeckSpellsCards(spellCards);
      setDeckEquipamentsCards(equipamentCards);
    }
  }, [cardResponse, deckResponse?.data]);

  useEffect(() => {
    updateView();
  }, [cardResponse, deckResponse, updateView]);

  const updateSelectedCard = useCallback((cardId: string) => {
    setSelectedCardId(cardId);
  }, []);

  const removeCardFromDeck = useCallback(() => {
    if (deckResponse?.data) {
      if(user?.id && selectedCardId) {
        deckResponse.data.gcardIds = deckResponse.data.gcardIds.filter(
          (id) => id !== selectedCardId
        );
        updateView();
        setRemoveCardBody({userId: user.id, gcardId:selectedCardId});
        toast('Card removed');
      }
    
    }
  }, [deckResponse?.data, selectedCardId, setRemoveCardBody, updateView, user?.id]);

  const addCardToDeck = useCallback(() => {
    if (deckResponse?.data && selectedCardId) {
      if (!deckResponse.data.gcardIds.includes(selectedCardId)) {
        if(user?.id) {
          deckResponse.data.gcardIds.push(selectedCardId);
        
          setAddCardBody({userId: user.id, gcardId:selectedCardId})
          updateView();
          toast('Card Added');
        }
      }
    }
  }, [deckResponse?.data, selectedCardId, setAddCardBody, updateView, user?.id]);

  return (
    <Page>
      <Flex justify={"center"} align={"center"} direction={"column"}>
        <Flex justify={"between"} align={"center"} width={"100%"}>
          <Card style={{ margin: "10px" }}>
            <Flex justify={"between"} minWidth={"300px"}>
              <Flex direction={"column"} justify={"center"} align={"center"}>
                <strong>Monsters</strong>
                {deckMonstersCards.length} / 20
              </Flex>
              <Flex direction={"column"} justify={"center"} align={"center"}>
                <strong>Spells</strong>
                {deckSpellsCards.length} / 10
              </Flex>
              <Flex direction={"column"} justify={"center"} align={"center"}>
                <strong>Equipaments</strong> {deckEquipamentsCards.length} / 5
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
              selectedCardId={selectedCardId}
              onSelectCard={updateSelectedCard}
            />
          </Card>
          <Flex flexGrow={"1"} direction={"column"} gap={"4"}>
            <Button onClick={() => addCardToDeck()}> {`<---`} </Button>
            <Button onClick={() => removeCardFromDeck()}> {`--->`} </Button>
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
              selectedCardId={selectedCardId}
              onSelectCard={updateSelectedCard}
            />
          </Card>
        </Flex>
      </Flex>
    </Page>
  );
};
