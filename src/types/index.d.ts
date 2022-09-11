export enum ClassName {
  War = 'War',
  Druid = 'Druid',
  Hunt = 'Hunt',
  Mage = 'Mage',
  Paladin = 'Paladin',
  Priest = 'Priest',
  Rogue = 'Rogue',
  Shaman = 'Shaman',
  Warlock = 'Warlock',
}

export enum Role {
  Tank = 'Tank',
  Heal = 'Heal',
  DpsMelee = 'DpsMelee',
  DpsDistance = 'DpsDistance',
}

export enum Marker {
  Skull = 'Skull',
  Cross = 'Cross',
  Square = 'Square',
  Star = 'Star',
  Diamond = 'Diamond',
  Triangle = 'Triangle',
  Moon = 'Moon',
  Circle = 'Circle',
}

export enum ZoneColor {
  Red = '#bb292a',
  Yellow = '#ebd118',
  Blue = "#3fc6f5",
  Green = "#42b54b",
}

/**
 * The number of minimum meters required between two players for
 * them not to link each other when targeted by the nature beam of C'thun
 */
export const MINIMUM_SPACE_BETWEEN_PLAYERS = 9.144
