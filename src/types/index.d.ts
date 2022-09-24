/** The possible character classes in the game */
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

/** The possible specializations available in the game */
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

/** The role a character holds in the raid */
export enum Role {
  Tank = 'Tank',
  Heal = 'Heal',
  DpsMelee = 'DpsMelee',
  DpsDistance = 'DpsDistance',
}

/** The possible raid signs/marks available to tag a character with */
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

export const BUILD_PER_ROLE: Record<Role, ClassBuild[]> = {
  [Role.DpsDistance]: [ClassBuild.DroodEqui, ClassBuild.HuntBeast, ClassBuild.HuntPrecision, ClassBuild.HuntSurvival, ClassBuild.MageArcanum, ClassBuild.MageFire, ClassBuild.MageFrost, ClassBuild.PriestShadow, ClassBuild.ShamElem, ClassBuild.WarlockAffliction, ClassBuild.WarlockDemonology, ClassBuild.WarlockDestruction],
  [Role.DpsMelee]: [ClassBuild.DroodFeral, ClassBuild.PalaVindic, ClassBuild.RogueAssass, ClassBuild.RogueCombat, ClassBuild.RogueSubtelty, ClassBuild.ShamAmelio, ClassBuild.WarArms, ClassBuild.WarFury],
  [Role.Heal]: [ClassBuild.DroodRestau, ClassBuild.PalaHoly, ClassBuild.PriestDiscipline, ClassBuild.PriestHoly, ClassBuild.ShamResto],
  [Role.Tank]: [ClassBuild.DroodFeral, ClassBuild.WarProt, ClassBuild.PalaProt],
}

export const BUILD_PER_CLASS: Record<ClassName, ClassBuild[]> = {
  [ClassName.Druid]: [ClassBuild.DroodEqui, ClassBuild.DroodFeral, ClassBuild.DroodRestau],
  [ClassName.Hunt]: [ClassBuild.HuntBeast, ClassBuild.HuntPrecision, ClassBuild.HuntSurvival],
  [ClassName.Mage]: [ClassBuild.MageArcanum, ClassBuild.MageFire, ClassBuild.MageFrost],
  [ClassName.Paladin]: [ClassBuild.PalaHoly, ClassBuild.PalaProt, ClassBuild.PalaVindic],
  [ClassName.Priest]: [ClassBuild.PriestDiscipline, ClassBuild.PriestHoly, ClassBuild.PriestShadow],
  [ClassName.Rogue]: [ClassBuild.RogueAssass, ClassBuild.RogueCombat, ClassBuild.RogueSubtelty],
  [ClassName.Shaman]: [ClassBuild.ShamAmelio, ClassBuild.ShamElem, ClassBuild.ShamResto],
  [ClassName.War]: [ClassBuild.WarArms, ClassBuild.WarFury, ClassBuild.WarProt],
  [ClassName.Warlock]: [ClassBuild.WarlockAffliction, ClassBuild.WarlockDemonology, ClassBuild.WarlockDestruction],
};

export const CLASS_PER_ROLE: Record<Role, ClassName[]> = {
  [Role.DpsDistance]: [ClassName.Druid, ClassName.Hunt, ClassName.Mage, ClassName.Priest, ClassName.Shaman, ClassName.Warlock],
  [Role.DpsMelee]: [ClassName.Druid, ClassName.Shaman, ClassName.Paladin, ClassName.Rogue, ClassName.War],
  [Role.Heal]: [ClassName.Druid, ClassName.Shaman, ClassName.Paladin, ClassName.Priest],
  [Role.Tank]: [ClassName.Druid, ClassName.War, ClassName.Paladin],
};