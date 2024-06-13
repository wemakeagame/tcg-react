import { GCard, GCardEquipament, GCardMonster, GCardSpell } from "./gcard";


export const monsterCards: GCardMonster[] = [
    {
        name: 'Red Goblin',
        rarity: 'common',
        type: 'moster',
        color: ['red'],
        image: '/assets/gcards/sample.png',
        id: 'gcard1',
        power: 1,
        life: 1
    },
    {
        name: 'Blue Goblin',
        rarity: 'common',
        type: 'moster',
        color: ['blue'],
        image: '/assets/gcards/sample.png',
        id: 'gcard2',
        power: 1,
        life: 1
    },
    {
        name: 'Green Goblin',
        rarity: 'common',
        type: 'moster',
        color: ['green'],
        image: '/assets/gcards/sample.png',
        id: 'gcard3',
        power: 1,
        life: 1
    },
    {
        name: 'Yellow Goblin',
        rarity: 'common',
        type: 'moster',
        color: ['yellow'],
        image: '/assets/gcards/sample.png',
        id: 'gcard4',
        power: 1,
        life: 1
    },
    {
        name: 'Red spider',
        rarity: 'common',
        type: 'moster',
        color: ['red'],
        image: '/assets/gcards/sample.png',
        id: 'gcard5',
        power: 2,
        life: 1
    },
    {
        name: 'Blue spider',
        rarity: 'common',
        type: 'moster',
        color: ['blue'],
        image: '/assets/gcards/sample.png',
        id: 'gcard6',
        power: 2,
        life: 1
    },
    {
        name: 'Slime',
        rarity: 'common',
        type: 'moster',
        color: ['green'],
        image: '/assets/gcards/sample.png',
        id: 'gcard7',
        power: 2,
        life: 1
    },
    {
        name: 'Walking vines',
        rarity: 'common',
        type: 'moster',
        color: ['green','yellow'],
        image: '/assets/gcards/sample.png',
        id: 'gcard8',
        power: 1,
        life: 1
    },
    {
        name: 'Wolf',
        rarity: 'common',
        type: 'moster',
        color: ['green','blue'],
        image: '/assets/gcards/sample.png',
        id: 'gcard9',
        power: 3,
        life: 2
    },
    {
        name: 'Fire lizard',
        rarity: 'rare',
        type: 'moster',
        color: ['red'],
        image: '/assets/gcards/sample.png',
        id: 'gcard10',
        power: 5,
        life: 3
    },
    {
        name: 'Light fairy',
        rarity: 'rare',
        type: 'moster',
        color: ['yellow'],
        image: '/assets/gcards/sample.png',
        id: 'gcard11',
        power: 7,
        life: 2
    },
    {
        name: 'Zombie dog',
        rarity: 'rare',
        type: 'moster',
        color: ['blue'],
        image: '/assets/gcards/sample.png',
        id: 'gcard12',
        power: 3,
        life: 6
    },
    {
        name: 'Swamp snake',
        rarity: 'rare',
        type: 'moster',
        color: ['green'],
        image: '/assets/gcards/sample.png',
        id: 'gcard13',
        power: 5,
        life: 4
    },
    {
        name: 'Lava Golem',
        rarity: 'rare',
        type: 'moster',
        color: ['red'],
        image: '/assets/gcards/sample.png',
        id: 'gcard14',
        power: 7,
        life: 2
    },
    {
        name: 'Water Golem',
        rarity: 'rare',
        type: 'moster',
        color: ['blue'],
        image: '/assets/gcards/sample.png',
        id: 'gcard15',
        power: 6,
        life: 3
    },
    {
        name: 'Wood Golem',
        rarity: 'rare',
        type: 'moster',
        color: ['green'],
        image: '/assets/gcards/sample.png',
        id: 'gcard16',
        power: 4,
        life: 4
    },
    {
        name: 'Hollow spirit',
        rarity: 'rare',
        type: 'moster',
        color: ['green', 'blue', 'red', 'yellow'],
        image: '/assets/gcards/sample.png',
        id: 'gcard17',
        power: 5,
        life: 1
    },
    {
        name: 'Sun Eagle',
        rarity: 'rare',
        type: 'moster',
        color: ['yellow'],
        image: '/assets/gcards/sample.png',
        id: 'gcard18',
        power: 4,
        life: 6,
    },
    {
        name: 'Eating man Plant',
        rarity: 'rare',
        type: 'moster',
        color: ['green'],
        image: '/assets/gcards/sample.png',
        id: 'gcard19',
        power: 5,
        life: 2,
    },
    {
        name: 'Moon fairy',
        rarity: 'rare',
        type: 'moster',
        color: ['blue'],
        image: '/assets/gcards/sample.png',
        id: 'gcard20',
        power: 3,
        life: 6,
    },
]

export const spellCards: GCardSpell[] = [
    {
        name: 'Night Eclipse',
        rarity: 'common',
        type: 'spell',
        color: [ 'blue', 'green'],
        image: '/assets/gcards/sample.png',
        id: 'gcard21',
        spell: 'absorb'
    },
    {
        name: 'Day Eclipse',
        rarity: 'common',
        type: 'spell',
        color: [ 'yellow', 'red'],
        image: '/assets/gcards/sample.png',
        id: 'gcard22',
        spell: 'absorb'
    },
    {
        name: 'Fire wall',
        rarity: 'common',
        type: 'spell',
        color: [ 'red'],
        image: '/assets/gcards/sample.png',
        id: 'gcard23',
        spell: 'cancel'
    },
    {
        name: 'Vine wall',
        rarity: 'common',
        type: 'spell',
        color: [ 'green'],
        image: '/assets/gcards/sample.png',
        id: 'gcard24',
        spell: 'cancel'
    },
    {
        name: 'Crystal wall',
        rarity: 'common',
        type: 'spell',
        color: [ 'blue'],
        image: '/assets/gcards/sample.png',
        id: 'gcard25',
        spell: 'cancel'
    },
    {
        name: 'Light wall',
        rarity: 'common',
        type: 'spell',
        color: [ 'yellow'],
        image: '/assets/gcards/sample.png',
        id: 'gcard26',
        spell: 'cancel'
    },
    {
        name: 'Dark hole',
        rarity: 'rare',
        type: 'spell',
        color: [ 'red', 'blue', 'yellow', 'green'],
        image: '/assets/gcards/sample.png',
        id: 'gcard27',
        spell: 'destroy'
    },
    {
        name: 'Sun Mirror',
        rarity: 'common',
        type: 'spell',
        color: [ 'red', 'yellow'],
        image: '/assets/gcards/sample.png',
        id: 'gcard28',
        spell: 'redirect'
    },
    {
        name: 'Moon Mirror',
        rarity: 'common',
        type: 'spell',
        color: [ 'green', 'blue'],
        image: '/assets/gcards/sample.png',
        id: 'gcard29',
        spell: 'redirect'
    },
    {
        name: 'Dimentinal fracture',
        rarity: 'rare',
        type: 'spell',
        color: [ 'red', 'blue', 'yellow', 'green'],
        image: '/assets/gcards/sample.png',
        id: 'gcard30',
        spell: 'absorb'
    },
];

export const equipamentsCards: GCardEquipament[] = [
    {
        name: 'Life ring',
        rarity: 'common',
        type: 'equipament',
        color: [ 'blue', 'green', 'red', 'yellow'],
        image: '/assets/gcards/sample.png',
        id: 'gcard31',
        life: 3
    },
    {
        name: 'Air shield',
        rarity: 'common',
        type: 'equipament',
        color: [ 'blue'],
        image: '/assets/gcards/sample.png',
        id: 'gcard32',
        life: 6
    },
    {
        name: 'light spear',
        rarity: 'common',
        type: 'equipament',
        color: [ 'yellow'],
        image: '/assets/gcards/sample.png',
        id: 'gcard33',
        power: 4
    },
    {
        name: 'Wooden hammer',
        rarity: 'common',
        type: 'equipament',
        color: [ 'green'],
        image: '/assets/gcards/sample.png',
        id: 'gcard34',
        power: 3
    },
    {
        name: 'Steam robe',
        rarity: 'common',
        type: 'equipament',
        color: [ 'red'],
        image: '/assets/gcards/sample.png',
        id: 'gcard35',
        power: 5,
        life: 3,
    },
]

export const cardsMock: GCard[] = [...monsterCards, ...spellCards, ...equipamentsCards];
