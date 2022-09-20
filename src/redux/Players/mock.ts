import { Player } from '.';
import { ClassBuild, ClassName, Role } from '../../types/index.d';

export const playerFactory = (params?: Partial<Player>): Player => ({
  name: 'Rxr',
  className: ClassName.War,
  role: Role.DpsMelee,
  build: ClassBuild.WarFury,
  ...params,
});

export const typicalRosterFactory = (): Player[] => [
  // 4 tanks
  playerFactory({
    name: `Azra`,
    role: Role.Tank,
    build: ClassBuild.WarProt,
  }),
  playerFactory({
    name: `Ocb`,
    role: Role.Tank,
    build: ClassBuild.WarProt,
  }),
  playerFactory({
    name: `Sacré`,
    role: Role.Tank,
    build: ClassBuild.WarProt,
  }),
  playerFactory({
    name: `Kornak`,
    className: ClassName.Druid,
    role: Role.Tank,
    build: ClassBuild.DroodFeral,
  }),
  playerFactory({
    name: `Zerk`,
    className: ClassName.Druid,
    role: Role.DpsMelee,
    build: ClassBuild.DroodFeral,
  }),
  playerFactory({
    name: `Anat`,
    role: Role.Heal,
    className: ClassName.Priest,
    build: ClassBuild.PriestHoly,
  }),
  playerFactory({
    name: `Mook`,
    role: Role.Heal,
    className: ClassName.Priest,
    build: ClassBuild.PriestHoly,
  }),
  playerFactory({
    name: `Garo`,
    role: Role.Heal,
    className: ClassName.Priest,
    build: ClassBuild.PriestDiscipline,
  }),
  playerFactory({
    name: `Vallabra`,
    role: Role.Heal,
    className: ClassName.Druid,
    build: ClassBuild.DroodRestau,
  }),
  playerFactory({
    name: `Pirz`,
    role: Role.Heal,
    className: ClassName.Druid,
    build: ClassBuild.DroodRestau,
  }),
  playerFactory({
    name: `Mowyn`,
    role: Role.Heal,
    className: ClassName.Druid,
    build: ClassBuild.DroodRestau,
  }),
  playerFactory({
    name: `Thogtom`,
    role: Role.Heal,
    className: ClassName.Shaman,
    build: ClassBuild.ShamResto,
  }),
  playerFactory({
    name: `Any`,
    role: Role.Heal,
    className: ClassName.Shaman,
    build: ClassBuild.ShamResto,
  }),
  playerFactory({
    name: `Sätïs`,
    role: Role.DpsDistance,
    className: ClassName.Shaman,
    build: ClassBuild.ShamAmelio,
  }),
  playerFactory({
    name: `Pyro`,
    role: Role.DpsDistance,
    className: ClassName.Mage,
    build: ClassBuild.MageFrost,
  }),
  playerFactory({
    name: `Peanuts`,
    role: Role.DpsDistance,
    className: ClassName.Mage,
    build: ClassBuild.MageFire,
  }),
  playerFactory({
    name: `Belladonas`,
    role: Role.DpsDistance,
    className: ClassName.Mage,
    build: ClassBuild.MageFire,
  }),
  playerFactory({
    name: `Guara`,
    role: Role.DpsDistance,
    className: ClassName.Mage,
    build: ClassBuild.MageFire,
  }),
  playerFactory({
    name: `Icecube`,
    role: Role.DpsDistance,
    className: ClassName.Mage,
    build: ClassBuild.MageFire,
  }),
  playerFactory({
    name: `Mimirr`,
    role: Role.DpsDistance,
    className: ClassName.Mage,
    build: ClassBuild.MageFire,
  }),
  playerFactory({
    name: `Drendé`,
    className: ClassName.Druid,
    role: Role.DpsDistance,
    build: ClassBuild.DroodEqui,
  }),
  playerFactory({
    name: `Raagnor`,
    role: Role.DpsDistance,
    className: ClassName.Warlock,
    build: ClassBuild.WarlockDestruction,
  }),
  playerFactory({
    name: `Deathroll`,
    role: Role.DpsDistance,
    className: ClassName.Warlock,
    build: ClassBuild.WarlockDestruction,
  }),
  playerFactory({
    name: `Yseult`,
    className: ClassName.Priest,
    role: Role.DpsDistance,
    build: ClassBuild.PriestShadow,
  }),
  playerFactory({
    name: `Nehz`,
    role: Role.DpsDistance,
    className: ClassName.Hunt,
    build: ClassBuild.HuntPrecision,
  }),
  playerFactory({
    name: `Skippy`,
    role: Role.DpsMelee,
    build: ClassBuild.WarFury,
  }),
  playerFactory({
    name: `Boarr`,
    role: Role.DpsMelee,
    build: ClassBuild.WarFury,
  }),
  playerFactory({
    name: `Bado`,
    role: Role.DpsMelee,
    build: ClassBuild.WarFury,
  }),
  playerFactory({
    name: `Pepz/Xyaz`,
    role: Role.DpsMelee,
    build: ClassBuild.WarFury,
  }),
  playerFactory({
    name: `Sheep/Ready`,
    role: Role.DpsMelee,
    build: ClassBuild.WarFury,
  }),
  playerFactory({
    name: `Amps`,
    role: Role.DpsMelee,
    build: ClassBuild.WarFury,
  }),
  playerFactory({
    name: `Yoggy`,
    role: Role.DpsMelee,
    build: ClassBuild.WarFury,
  }),
  playerFactory({
    name: `Kalynne`,
    role: Role.DpsMelee,
    build: ClassBuild.WarFury,
  }),
  playerFactory({
    name: `Ouantit`,
    role: Role.DpsMelee,
    className: ClassName.Rogue,
    build: ClassBuild.RogueCombat,
  }),
  playerFactory({
    name: `Taiho`,
    role: Role.DpsMelee,
    className: ClassName.Rogue,
    build: ClassBuild.RogueCombat,
  }),
  playerFactory({
    name: `Furadort`,
    role: Role.DpsMelee,
    className: ClassName.Rogue,
    build: ClassBuild.RogueCombat,
  }),
  playerFactory({
    name: `Boyserre`,
    role: Role.DpsMelee,
    className: ClassName.Rogue,
    build: ClassBuild.RogueCombat,
  }),
  playerFactory({
    name: `Jigotte`,
    role: Role.DpsMelee,
    className: ClassName.Rogue,
    build: ClassBuild.RogueCombat,
  }),
];
