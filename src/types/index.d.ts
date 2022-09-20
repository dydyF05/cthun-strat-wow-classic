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

export enum ClassBuild {
  WarFury = 'WarFury',
  WarProt = 'WarProt',
  WarArms = 'WarArms',
  RogueAssass = 'RogueAssass',
  RogueCombat = 'RogueCombat',
  RogueSubtelty = 'RogueSubtelty',
  WarlockAffliction = 'WarlockAffliction',
  WarlockDemonology = 'WarlockDemonology',
  WarlockDestruction = 'WarlockDestruction',
  DroodFeral = 'DroodFeral',
  DroodEqui = 'DroodEqui',
  DroodRestau = 'DroodRestau',
  PriestDiscipline = 'PriestDiscipline',
  PriestHoly = 'PriestHoly',
  PriestShadow = 'PriestShadow',
  MageFrost = 'MageFrost',
  MageFire = 'MageFire',
  MageArcanum = 'MageArcanum',
  PalaVindic = 'PalaVindic',
  PalaHoly = 'PalaHoly',
  PalaProt = 'PalaProt',
  ShamElem = 'ShamElem',
  ShamAmelio = 'ShamAmelio',
  ShamResto = 'ShamResto',
  HuntBeast = 'HuntBeast',
  HuntPrecision = 'HuntPrecision',
  HuntSurvival = 'HuntSurvival',
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
export const MINIMUM_SPACE_BETWEEN_LINES = 9.144

/**
 * The delay of debounce before which a window resize triggers a measures dispatch
 */
export const RESIZE_DEBOUNCE_TRIGGER_GRAPH_MEASURES = 500;
