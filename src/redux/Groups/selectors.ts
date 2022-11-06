import { Group } from '.';
import { Player } from '../Players';
import { RootState } from '../store';

export const groupsSelector = (state: RootState): RootState['groups'] => state.groups;

const groupSelector =
  (groupId: Group['id']) =>
  (state: RootState): Group | undefined =>
    state.groups.find(group => group.id === groupId);

export const groupIdsSelector = (state: RootState): RootState['groups'][0]['id'][] =>
  state.groups.map(({ id }) => id);

export const groupSlotsSelector =
  (groupId: Group['id']) =>
  (state: RootState): Group['playerIds'] | undefined => {
    const group = groupSelector(groupId)(state);
    if (!group) return;

    return group.playerIds;
  };

export const groupColorSelector =
  (groupId: Group['id']) =>
  (state: RootState): Group['color'] | undefined => {
    const group = groupSelector(groupId)(state);
    if (!group) return;

    return group.color;
  };

export const groupPlayerIdSelector =
  (groupId: Group['id'], index: number) =>
  (state: RootState): Group['playerIds'][0] | undefined => {
    const slots = groupSlotsSelector(groupId)(state);
    if (!slots) return;

    return slots[index];
  };

export const groupIdForPlayerIdSelector =
  (playerId?: Player['id']) =>
  (state: RootState): Group['id'] | undefined => {
    if (!playerId) return;

    const groups = groupsSelector(state);
    for (const group of groups) {
      if (group.playerIds.includes(playerId)) {
        return group.id;
      }
    }
  };
