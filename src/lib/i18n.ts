import { ClassBuild, ClassName, Role } from '../types/index.d';

export const ROLE_LABELS: Record<Role, string> = {
  [Role.DpsDistance]: 'Dps distance',
  [Role.DpsMelee]: 'Dps melee',
  [Role.Heal]: 'Heal',
  [Role.Tank]: 'Tank',
};

export const CLASS_LABELS: Record<ClassName, string> = {
  [ClassName.Druid]: 'Drood',
  [ClassName.Hunt]: 'Hunter',
  [ClassName.Mage]: 'Mage',
  [ClassName.Paladin]: 'Pala',
  [ClassName.Priest]: 'Priest',
  [ClassName.Rogue]: 'Rogue',
  [ClassName.Shaman]: 'Shaman',
  [ClassName.War]: 'War',
  [ClassName.Warlock]: 'Warlock',
};

export const BUILD_LABELS: Record<ClassBuild, string> = {
  [ClassBuild.WarFury]: 'Fury',
  [ClassBuild.WarProt]: 'Prot',
  [ClassBuild.WarArms]: 'Arms',
  [ClassBuild.RogueAssass]: 'Assassin',
  [ClassBuild.RogueCombat]: 'Combat',
  [ClassBuild.RogueSubtelty]: 'Subtelty',
  [ClassBuild.WarlockAffliction]: 'Affliction',
  [ClassBuild.WarlockDemonology]: 'Demonology',
  [ClassBuild.WarlockDestruction]: 'Destruction',
  [ClassBuild.DroodFeral]: 'Feral',
  [ClassBuild.DroodEqui]: 'Equi',
  [ClassBuild.DroodRestau]: 'Restau',
  [ClassBuild.PriestDiscipline]: 'Discipline',
  [ClassBuild.PriestHoly]: 'Holy',
  [ClassBuild.PriestShadow]: 'Shadow',
  [ClassBuild.MageFrost]: 'Frost',
  [ClassBuild.MageFire]: 'Fire',
  [ClassBuild.MageArcanum]: 'Arcanum',
  [ClassBuild.PalaVindic]: 'Ret',
  [ClassBuild.PalaHoly]: 'Holy',
  [ClassBuild.PalaProt]: 'Prot',
  [ClassBuild.ShamElem]: 'Elem',
  [ClassBuild.ShamAmelio]: 'Amelio',
  [ClassBuild.ShamResto]: 'Resto',
  [ClassBuild.HuntBeast]: 'Beast',
  [ClassBuild.HuntPrecision]: 'Precision',
  [ClassBuild.HuntSurvival]: 'Survival',
};
