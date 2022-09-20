import { Player } from '.';
import { ClassBuild, ClassName, Role } from '../../types/index.d';

export const playerFactory = (params?: Partial<Player>): Player => ({
  name: 'Rxr',
  className: ClassName.War,
  role: Role.DpsMelee,
  build: ClassBuild.Fury,
  ...params,
});

export const typicalRosterFactory = (): Player[] => [
  // 4 tanks
  ...Array.from({ length: 3 }).map((_, index) =>
    playerFactory({
      name: `WarTank${index + 1}`,
      role: Role.Tank,
      build: ClassBuild.Prot,
    })
  ),
  playerFactory({
    name: `DroodTank`,
    className: ClassName.Druid,
    role: Role.Tank,
    build: ClassBuild.Feral,
  }),
  // 10 Heals
  ...Array.from({ length: 4 }).map((_, index) =>
    playerFactory({
      name: `PriestHeal${index + 1}`,
      role: Role.Heal,
      className: ClassName.Priest,
    })
  ),
  ...Array.from({ length: 2 }).map((_, index) =>
    playerFactory({
      name: `DroodHeal${index + 1}`,
      role: Role.Heal,
      className: ClassName.Druid,
      build: ClassBuild.Restau,
    })
  ),
  ...Array.from({ length: 4 }).map((_, index) =>
    playerFactory({
      name: `ShamHeal${index + 1}`,
      role: Role.Heal,
      className: ClassName.Shaman,
      build: ClassBuild.Restau,
    })
  ),
  // 12 casters
  ...Array.from({ length: 6 }).map((_, index) =>
    playerFactory({
      name: `Mago${index + 1}`,
      role: Role.DpsDistance,
      className: ClassName.Mage,
      build: ClassBuild.Fire,
    })
  ),
  playerFactory({
    name: `Owl`,
    className: ClassName.Druid,
    role: Role.DpsDistance,
    build: ClassBuild.Equi,
  }),
  ...Array.from({ length: 4 }).map((_, index) =>
    playerFactory({
      name: `Warlock${index + 1}`,
      role: Role.DpsDistance,
      className: ClassName.Warlock,
      build: ClassBuild.Destruction,
    })
  ),
  playerFactory({
    name: `ShadowPriest`,
    className: ClassName.Priest,
    role: Role.DpsDistance,
    build: ClassBuild.Shadow,
  }),
  // 2 Hunts
  ...Array.from({ length: 2 }).map((_, index) =>
    playerFactory({
      name: `Hunt${index + 1}`,
      role: Role.DpsDistance,
      className: ClassName.Hunt,
      build: ClassBuild.Precision,
    })
  ),
  // 12 Cac
  ...Array.from({ length: 8 }).map((_, index) =>
    playerFactory({
      name: `WarDD${index + 1}`,
      role: Role.DpsMelee,
      build: ClassBuild.Fury,
    })
  ),
  ...Array.from({ length: 4 }).map((_, index) =>
    playerFactory({
      name: `Rogue${index + 1}`,
      role: Role.DpsMelee,
      className: ClassName.Rogue,
      build: ClassBuild.Combat,
    })
  ),
];
