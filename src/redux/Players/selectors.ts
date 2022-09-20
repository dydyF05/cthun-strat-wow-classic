import { entries, isEmpty } from 'lodash/fp';
import { Player } from '.';
import { ClassName, Role } from '../../types/index.d';
import { RootState } from '../store';

const playersSelector = (state: RootState): RootState['players'] => state.players;

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
