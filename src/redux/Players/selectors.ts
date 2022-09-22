import { entries, isEmpty } from 'lodash/fp';
import { Player } from '.';
import { ClassName, Role } from '../../types/index.d';
import { RootState } from '../store';

export const playersSelector = (state: RootState): RootState['players'] => state.players;

export const playerCountSelector = (state: RootState): number => playersSelector(state).length;

export const playerStatsSelector = (state: RootState) => {
  const total = playerCountSelector(state);

  const all = playersSelector(state);

  return {
    total,
    tank: all.filter(player => player.role === Role.Tank).length,
    heal: all.filter(player => player.role === Role.Heal).length,
    dpsMelee: all.filter(player => player.role === Role.DpsMelee).length,
    dpsDistance: all.filter(player => player.role === Role.DpsDistance).length,
  };
};

type PlayerSelectorParams = Pick<Player, 'name'>;

export const playerSelector =
  ({ name }: PlayerSelectorParams) =>
  (state: RootState): Player | undefined =>
    playersSelector(state).find(player => player.name === name);

type PlayersSelectorFiltersStrict = {
  role: Role[];
  className: ClassName[];
};
export type PlayersSelectorFilters = Partial<PlayersSelectorFiltersStrict>;

export const filteredPlayersSelector =
  (filters: PlayersSelectorFilters) =>
  (state: RootState): Player['name'][] | undefined => {
    if (!filters.className?.length && !filters.role?.length) return undefined;

    const allPlayers = playersSelector(state);

    const safeFilters = entries(filters).filter(([key, value]) => !!key && !isEmpty(value));

    return allPlayers
      .filter(
        player =>
          !safeFilters.some(([_filterKey, filterValue]) => {
            const filterKey = _filterKey as keyof Player;
            return !(filterValue as any).includes(player[filterKey]);
          })
      )
      .map(player => player.name);
  };

export const allPlayerNamesSelector = (state: RootState): Player['name'][] =>
  playersSelector(state).map(({ name }) => name);