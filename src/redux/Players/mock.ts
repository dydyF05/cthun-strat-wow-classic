import { Player } from '.';
import { ClassBuild, ClassName, Role } from '../../types/index.d';
import { Position } from '../Positions';

type PlayerWithPositionId = Player & { positionId?: Position['index'] };

export const playerFactory = (params?: Partial<Player>): Player => ({
  name: 'Rxr',
  className: ClassName.War,
  role: Role.DpsMelee,
  build: ClassBuild.WarFury,
  ...params,
});

export const typicalRosterFactory = (): PlayerWithPositionId[] => [
  // 4 tanks
  {
    ...playerFactory({
      name: `Azra`,
      role: Role.Tank,
      build: ClassBuild.WarProt,
    }),
    positionId: 10,
  },
  {
    ...playerFactory({
      name: `Ocb`,
      role: Role.Tank,
      build: ClassBuild.WarProt,
    }),
    positionId: 12,
  },
  {
    ...playerFactory({
      name: `Sacré`,
      role: Role.Tank,
      build: ClassBuild.WarProt,
    }),
    positionId: 14,
  },
  {
    ...playerFactory({
      name: `Kornak`,
      className: ClassName.Druid,
      role: Role.Tank,
      build: ClassBuild.DroodFeral,
    }),
    positionId: 16,
  },
  {
    ...playerFactory({
      name: `Zerk`,
      className: ClassName.Druid,
      role: Role.DpsMelee,
      build: ClassBuild.DroodFeral,
    }),
    positionId: 11,
  },
  {
    ...playerFactory({
      name: `Anat`,
      role: Role.Heal,
      className: ClassName.Priest,
      build: ClassBuild.PriestHoly,
    }),
    positionId: 17,
  },
  {
    ...playerFactory({
      name: `Mook`,
      role: Role.Heal,
      className: ClassName.Priest,
      build: ClassBuild.PriestHoly,
    }),
    positionId: 34,
  },
  {
    ...playerFactory({
      name: `Garo`,
      role: Role.Heal,
      className: ClassName.Priest,
      build: ClassBuild.PriestDiscipline,
    }),
    positionId: 39,
  },
  {
    ...playerFactory({
      name: `Vallabra`,
      role: Role.Heal,
      className: ClassName.Druid,
      build: ClassBuild.DroodRestau,
    }),
  },
  {
    ...playerFactory({
      name: `Pirz`,
      role: Role.Heal,
      className: ClassName.Druid,
      build: ClassBuild.DroodRestau,
    }),
  },
  {
    ...playerFactory({
      name: `Mowyn`,
      role: Role.Heal,
      className: ClassName.Druid,
      build: ClassBuild.DroodRestau,
    }),
    positionId: 38,
  },
  {
    ...playerFactory({
      name: `Thogtom`,
      role: Role.Heal,
      className: ClassName.Shaman,
      build: ClassBuild.ShamResto,
    }),
    positionId: 19,
  },
  {
    ...playerFactory({
      name: `Any`,
      role: Role.Heal,
      className: ClassName.Shaman,
      build: ClassBuild.ShamResto,
    }),
    positionId: 32,
  },
  {
    ...playerFactory({
      name: `Furadort`,
      role: Role.Heal,
      className: ClassName.Shaman,
      build: ClassBuild.ShamResto,
    }),
    positionId: 35,
  },
  {
    ...playerFactory({
      name: `Sätïs`,
      role: Role.DpsDistance,
      className: ClassName.Shaman,
      build: ClassBuild.ShamAmelio,
    }),
    positionId: 27,
  },
  {
    ...playerFactory({
      name: `Pyro`,
      role: Role.DpsDistance,
      className: ClassName.Mage,
      build: ClassBuild.MageFire,
    }),
    positionId: 40,
  },
  {
    ...playerFactory({
      name: `Peanuts`,
      role: Role.DpsDistance,
      className: ClassName.Mage,
      build: ClassBuild.MageFire,
    }),
    positionId: 25,
  },
  {
    ...playerFactory({
      name: `Belladonas`,
      role: Role.DpsDistance,
      className: ClassName.Mage,
      build: ClassBuild.MageFire,
    }),
    positionId: 36,
  },
  {
    ...playerFactory({
      name: `Guara`,
      role: Role.DpsDistance,
      className: ClassName.Mage,
      build: ClassBuild.MageFire,
    }),
    positionId: 37,
  },
  {
    ...playerFactory({
      name: `Icecube`,
      role: Role.DpsDistance,
      className: ClassName.Mage,
      build: ClassBuild.MageFire,
    }),
    positionId: 26,
  },
  {
    ...playerFactory({
      name: `Mimiir`,
      role: Role.DpsDistance,
      className: ClassName.Mage,
      build: ClassBuild.MageFire,
    }),
    positionId: 33,
  },
  {
    ...playerFactory({
      name: `Drendé`,
      className: ClassName.Druid,
      role: Role.DpsDistance,
      build: ClassBuild.DroodEqui,
    }),
    positionId: 24,
  },
  {
    ...playerFactory({
      name: `Raagnor`,
      role: Role.DpsDistance,
      className: ClassName.Warlock,
      build: ClassBuild.WarlockDestruction,
    }),
    positionId: 28,
  },
  {
    ...playerFactory({
      name: `Deathroll`,
      role: Role.DpsDistance,
      className: ClassName.Warlock,
      build: ClassBuild.WarlockDestruction,
    }),
    positionId: 29,
  },
  {
    ...playerFactory({
      name: `Veni`,
      role: Role.DpsDistance,
      className: ClassName.Warlock,
      build: ClassBuild.WarlockDestruction,
    }),
    positionId: 30,
  },
  {
    ...playerFactory({
      name: `Mhys`,
      role: Role.DpsDistance,
      className: ClassName.Warlock,
      build: ClassBuild.WarlockDestruction,
    }),
    positionId: 31,
  },
  {
    ...playerFactory({
      name: `Yseult`,
      className: ClassName.Priest,
      role: Role.DpsDistance,
      build: ClassBuild.PriestShadow,
    }),
    positionId: 15,
  },
  {
    ...playerFactory({
      name: `Nehz`,
      role: Role.DpsDistance,
      className: ClassName.Hunt,
      build: ClassBuild.HuntPrecision,
    }),
    positionId: 20,
  },
  {
    ...playerFactory({
      name: `Skippy`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 1,
  },
  {
    ...playerFactory({
      name: `Boarr`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 2,
  },
  {
    ...playerFactory({
      name: `Bado`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 3,
  },
  {
    ...playerFactory({
      name: `Pepz/Xyaz`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 4,
  },
  {
    ...playerFactory({
      name: `Ready`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 13,
  },
  {
    ...playerFactory({
      name: `Badguy`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 22,
  },
  {
    ...playerFactory({
      name: `Amps`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 23,
  },
  {
    ...playerFactory({
      name: `Yoggy`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 18,
  },
  {
    ...playerFactory({
      name: `Kalynne`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 5,
  },
  {
    ...playerFactory({
      name: `Ouantit`,
      role: Role.DpsMelee,
      className: ClassName.Rogue,
      build: ClassBuild.RogueCombat,
    }),
    positionId: 6,
  },
  {
    ...playerFactory({
      name: `Nicks`,
      role: Role.DpsMelee,
      className: ClassName.Rogue,
      build: ClassBuild.RogueCombat,
    }),
    positionId: 9,
  },
  {
    ...playerFactory({
      name: `Boyserre`,
      role: Role.DpsMelee,
      className: ClassName.Rogue,
      build: ClassBuild.RogueCombat,
    }),
    positionId: 8,
  },
  {
    ...playerFactory({
      name: `Jigotte`,
      role: Role.DpsMelee,
      className: ClassName.Rogue,
      build: ClassBuild.RogueCombat,
    }),
    positionId: 21,
  },
  {
    ...playerFactory({
      name: `Dagua`,
      role: Role.DpsMelee,
      className: ClassName.Rogue,
      build: ClassBuild.RogueCombat,
    }),
    positionId: 7,
  },
];
