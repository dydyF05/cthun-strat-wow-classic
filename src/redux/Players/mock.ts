import { Player } from '.';
import { ClassName, Role } from '../../types/index.d';

export const playerFactory = (params?: Partial<Player>): Player => ({
  name: 'Rxr',
  className: ClassName.War,
  role: Role.DpsMelee,
  ...params,
});

export const typicalRosterFactory = (): Player[] => [
  // 4 tanks
  ...Array.from({ length: 3 }).map((_, index) =>
    playerFactory({
      name: `WarTank${index + 1}`,
      role: Role.Tank,
    })
  ),
  playerFactory({
    name: `DroodTank`,
    className: ClassName.Druid,
    role: Role.Tank,
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
    })
  ),
  ...Array.from({ length: 4 }).map((_, index) =>
    playerFactory({
      name: `ShamHeal${index + 1}`,
      role: Role.Heal,
      className: ClassName.Shaman,
    })
  ),
  // 12 casters
  ...Array.from({ length: 6 }).map((_, index) =>
    playerFactory({
      name: `Mago${index + 1}`,
      role: Role.DpsDistance,
      className: ClassName.Mage,
    })
  ),
  playerFactory({
    name: `Owl`,
    className: ClassName.Druid,
    role: Role.DpsDistance,
  }),
  ...Array.from({ length: 4 }).map((_, index) =>
    playerFactory({
      name: `Warlock${index + 1}`,
      role: Role.DpsDistance,
      className: ClassName.Warlock,
    })
  ),
  playerFactory({
    name: `ShadowPriest`,
    className: ClassName.Priest,
    role: Role.DpsDistance,
  }),
  // 2 Hunts
  ...Array.from({ length: 2 }).map((_, index) =>
    playerFactory({
      name: `Hunt${index + 1}`,
      role: Role.DpsDistance,
      className: ClassName.Hunt,
    })
  ),
  // 12 Cac
  ...Array.from({ length: 8 }).map((_, index) =>
    playerFactory({
      name: `WarDD${index + 1}`,
      role: Role.DpsMelee,
    })
  ),
  ...Array.from({ length: 4 }).map((_, index) =>
    playerFactory({
      name: `Rogue${index + 1}`,
      role: Role.DpsMelee,
      className: ClassName.Rogue,
    })
  ),
];
