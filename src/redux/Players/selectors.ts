import { entries, isEmpty } from 'lodash/fp';
import { Player } from '.';
import { ClassName, Role } from '../../types/index.d';
import { RootState } from '../store';

export const playersSelector = (state: RootState): RootState['players'] => state.players;

export const playerCountSelector = (state: RootState): number => playersSelector(state).length;

export const playerWithRoleCount =
  (role: Role) =>
  (state: RootState): number =>
    playersSelector(state).filter(player => player.role === role).length;

type PlayerSelectorParams = Pick<Player, 'name'>;

export const playerSelector =
  ({ name }: PlayerSelectorParams) =>
  (state: RootState): Player | undefined =>
    playersSelector(state).find(player => player.name === name);

type PlayersSelectorFiltersStrict = {
  roles: Role[];
  classNames: ClassName[];
};
export type PlayersSelectorFilters = Partial<PlayersSelectorFiltersStrict>;

export const filteredPlayersSelector =
  (filters: PlayersSelectorFilters) =>
  (state: RootState): Player['name'][] | undefined => {
    if (!filters.classNames?.length && !filters.roles?.length) return undefined;

    const allPlayers = playersSelector(state);

    const safeFilters = entries(filters).filter(([key, value]) => !!key && !isEmpty(value));

    return allPlayers
      .filter(
        player =>
          !safeFilters.some(([filterKey, filterValue]) => {
            const playerProp: keyof Player = filterKey.startsWith('role') ? 'role' : 'className';

            return !(filterValue as any).includes(player[playerProp]);
          })
      )
      .map(player => player.name);
  };

export const allPlayerNamesSelector = (state: RootState): Player['name'][] =>
  playersSelector(state).map(({ name }) => name);
