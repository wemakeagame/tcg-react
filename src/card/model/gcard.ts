const rarity = ['common', 'rare', 'epic', 'legendary'] as const;
const gcardType = ['monster', 'spell', 'equipament'] as const;
const gcardColor = ['blue', 'red', 'yellow', 'green'] as const;
const spell = ['destroy', 'absorb', 'cancel', 'redirect'] as const;

export type Rarity = typeof rarity[number];
export type GCardType = typeof gcardType[number];
export type GCardColor = typeof gcardColor[number];
export type GCardSpellType = typeof spell[number];

export interface GCardBase {
    name: string;
    rarity: Rarity;
    type: GCardType;
    color: GCardColor[];
    image: string;
    id: string;
}

export interface GCardMonster extends GCardBase {
    power: number;
    life: number;
}

export interface GCardSpell extends GCardBase {
    spell: GCardSpellType;
}

export interface GCardEquipament extends GCardBase {
    power?: number;
    life?: number;
}

export type GCard = GCardMonster | GCardSpell | GCardEquipament;

export type Deck = {
    userId: string;
    gcardIds: string[];
}