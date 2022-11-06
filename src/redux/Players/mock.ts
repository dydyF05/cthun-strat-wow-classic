import { Player } from '.';
import { generatePlayerId } from '../../lib/player';
import { ClassBuild, ClassName, Role } from '../../types/index.d';
import { Group } from '../Groups';
import { Position } from '../Positions';

type PlayerWithPositionId = Player & {
  positionId?: Position['index'];
  groupId?: Group['id'];
  groupIndex?: number;
};

export const playerFactory = (params?: Partial<Player>): Player => ({
  id: generatePlayerId(),
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
    groupId: 8,
    groupIndex: 1,
  },
  {
    ...playerFactory({
      name: `Ocb`,
      role: Role.Tank,
      build: ClassBuild.WarProt,
    }),
    positionId: 12,
    groupId: 2,
    groupIndex: 1,
  },
  {
    ...playerFactory({
      name: `Sacré`,
      role: Role.Tank,
      build: ClassBuild.WarProt,
    }),
    positionId: 14,
    groupId: 4,
    groupIndex: 1,
  },
  {
    ...playerFactory({
      name: `Kornak`,
      className: ClassName.Druid,
      role: Role.Tank,
      build: ClassBuild.DroodFeral,
    }),
    positionId: 16,
    groupId: 6,
    groupIndex: 1,
  },
  {
    ...playerFactory({
      name: `Zerk`,
      className: ClassName.Druid,
      role: Role.DpsMelee,
      build: ClassBuild.DroodFeral,
    }),
    positionId: 21,
    groupId: 1,
    groupIndex: 2,
  },
  {
    ...playerFactory({
      name: `Anat`,
      role: Role.Heal,
      className: ClassName.Priest,
      build: ClassBuild.PriestHoly,
    }),
    positionId: 17,
    groupId: 7,
    groupIndex: 0,
  },
  {
    ...playerFactory({
      name: `Mook`,
      role: Role.Heal,
      className: ClassName.Priest,
      build: ClassBuild.PriestHoly,
    }),
    positionId: 34,
    groupId: 7,
    groupIndex: 4,
  },
  {
    ...playerFactory({
      name: `Garo`,
      role: Role.Heal,
      className: ClassName.Priest,
      build: ClassBuild.PriestDiscipline,
    }),
    positionId: 39,
    groupId: 7,
    groupIndex: 3,
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
    groupId: 4,
    groupIndex: 3,
  },
  {
    ...playerFactory({
      name: `Thogtom`,
      role: Role.Heal,
      className: ClassName.Shaman,
      build: ClassBuild.ShamResto,
    }),
    positionId: 19,
    groupId: 8,
    groupIndex: 2,
  },
  {
    ...playerFactory({
      name: `Any`,
      role: Role.Heal,
      className: ClassName.Shaman,
      build: ClassBuild.ShamResto,
    }),
    positionId: 32,
    groupId: 6,
    groupIndex: 2,
  },
  {
    ...playerFactory({
      name: `Furadort`,
      role: Role.Heal,
      className: ClassName.Shaman,
      build: ClassBuild.ShamResto,
    }),
    positionId: 35,
    groupId: 1,
    groupIndex: 4,
  },
  {
    ...playerFactory({
      name: `Sätïs`,
      role: Role.DpsDistance,
      className: ClassName.Shaman,
      build: ClassBuild.ShamAmelio,
    }),
    positionId: 27,
    groupId: 4,
    groupIndex: 2,
  },
  {
    ...playerFactory({
      name: `Pyro`,
      role: Role.DpsDistance,
      className: ClassName.Mage,
      build: ClassBuild.MageFire,
    }),
    positionId: 40,
    groupId: 7,
    groupIndex: 1,
  },
  {
    ...playerFactory({
      name: `Peanuts`,
      role: Role.DpsDistance,
      className: ClassName.Mage,
      build: ClassBuild.MageFire,
    }),
    positionId: 25,
    groupId: 3,
    groupIndex: 3,
  },
  {
    ...playerFactory({
      name: `Belladonas`,
      role: Role.DpsDistance,
      className: ClassName.Mage,
      build: ClassBuild.MageFire,
    }),
    positionId: 36,
    groupId: 3,
    groupIndex: 4,
  },
  {
    ...playerFactory({
      name: `Guara`,
      role: Role.DpsDistance,
      className: ClassName.Mage,
      build: ClassBuild.MageFire,
    }),
    positionId: 37,
    groupId: 3,
    groupIndex: 1,
  },
  {
    ...playerFactory({
      name: `Icecube`,
      role: Role.DpsDistance,
      className: ClassName.Mage,
      build: ClassBuild.MageFire,
    }),
    positionId: 26,
    groupId: 3,
    groupIndex: 2,
  },
  {
    ...playerFactory({
      name: `Mimiir`,
      role: Role.DpsDistance,
      className: ClassName.Mage,
      build: ClassBuild.MageFire,
    }),
    positionId: 33,
    groupId: 7,
    groupIndex: 2,
  },
  {
    ...playerFactory({
      name: `Drendé`,
      className: ClassName.Druid,
      role: Role.DpsDistance,
      build: ClassBuild.DroodEqui,
    }),
    positionId: 24,
    groupId: 3,
    groupIndex: 0,
  },
  {
    ...playerFactory({
      name: `Raagnor`,
      role: Role.DpsDistance,
      className: ClassName.Warlock,
      build: ClassBuild.WarlockDestruction,
    }),
    positionId: 28,
    groupId: 5,
    groupIndex: 1,
  },
  {
    ...playerFactory({
      name: `Deathroll`,
      role: Role.DpsDistance,
      className: ClassName.Warlock,
      build: ClassBuild.WarlockDestruction,
    }),
    positionId: 29,
    groupId: 5,
    groupIndex: 2,
  },
  {
    ...playerFactory({
      name: `Veni`,
      role: Role.DpsDistance,
      className: ClassName.Warlock,
      build: ClassBuild.WarlockDestruction,
    }),
    positionId: 30,
    groupId: 5,
    groupIndex: 3,
  },
  {
    ...playerFactory({
      name: `Mhys`,
      role: Role.DpsDistance,
      className: ClassName.Warlock,
      build: ClassBuild.WarlockDestruction,
    }),
    positionId: 31,
    groupId: 5,
    groupIndex: 4,
  },
  {
    ...playerFactory({
      name: `Yseult`,
      className: ClassName.Priest,
      role: Role.DpsDistance,
      build: ClassBuild.PriestShadow,
    }),
    positionId: 15,
    groupId: 5,
    groupIndex: 0,
  },
  {
    ...playerFactory({
      name: `Nehz`,
      role: Role.DpsDistance,
      className: ClassName.Hunt,
      build: ClassBuild.HuntPrecision,
    }),
    positionId: 20,
    groupId: 8,
    groupIndex: 3,
  },
  {
    ...playerFactory({
      name: `Skippy`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 1,
    groupId: 6,
    groupIndex: 3,
  },
  {
    ...playerFactory({
      name: `Boarr`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 2,
    groupId: 8,
    groupIndex: 0,
  },
  {
    ...playerFactory({
      name: `Bado`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 3,
    groupId: 1,
    groupIndex: 0,
  },
  {
    ...playerFactory({
      name: `Pepz/Xyaz`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 4,
    groupId: 2,
    groupIndex: 0,
  },
  {
    ...playerFactory({
      name: `Ready`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 13,
    groupId: 2,
    groupIndex: 4,
  },
  {
    ...playerFactory({
      name: `Badguy`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 22,
    groupId: 1,
    groupIndex: 3,
  },
  {
    ...playerFactory({
      name: `Amps`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 23,
    groupId: 2,
    groupIndex: 2,
  },
  {
    ...playerFactory({
      name: `Yoggy`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 18,
    groupId: 8,
    groupIndex: 4,
  },
  {
    ...playerFactory({
      name: `Kalynne`,
      role: Role.DpsMelee,
      build: ClassBuild.WarFury,
    }),
    positionId: 5,
    groupId: 2,
    groupIndex: 3,
  },
  {
    ...playerFactory({
      name: `Ouantit`,
      role: Role.DpsMelee,
      className: ClassName.Rogue,
      build: ClassBuild.RogueCombat,
    }),
    positionId: 6,
    groupId: 4,
    groupIndex: 0,
  },
  {
    ...playerFactory({
      name: `Nicks`,
      role: Role.DpsMelee,
      className: ClassName.Rogue,
      build: ClassBuild.RogueCombat,
    }),
    positionId: 9,
    groupId: 6,
    groupIndex: 4,
  },
  {
    ...playerFactory({
      name: `Boyserre`,
      role: Role.DpsMelee,
      className: ClassName.Rogue,
      build: ClassBuild.RogueCombat,
    }),
    positionId: 8,
    groupId: 6,
    groupIndex: 0,
  },
  {
    ...playerFactory({
      name: `Jigotte`,
      role: Role.DpsMelee,
      className: ClassName.Rogue,
      build: ClassBuild.RogueCombat,
    }),
    positionId: 11,
    groupId: 1,
    groupIndex: 1,
  },
  {
    ...playerFactory({
      name: `Dagua`,
      role: Role.DpsMelee,
      className: ClassName.Rogue,
      build: ClassBuild.RogueCombat,
    }),
    positionId: 7,
    groupId: 4,
    groupIndex: 4,
  },
];
