import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { entries, groupBy } from 'lodash/fp';
import { Player } from '../Players';

export const MAX_PLAYERS_PER_GROUP = 5;

export type Group = {
  id: number;
  playerIds: Player['name'][];
};

/** Groups state */
export type State = Group[];

type AddPlayerInGroup = {
  groupdId: Group['id'];
  playerId: Group['playerIds'][0];
};

export type RemovePlayersInGroups = AddPlayerInGroup[];

const getInitialState = (): State =>
  Array.from({ length: 8 }).map((_, index) => ({
    id: index + 1,
    playerIds: [],
  }));

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: getInitialState(),
  reducers: {
    addPlayerToGroup: (state, { payload }: PayloadAction<AddPlayerInGroup>) => {
      const group = state.find(group => group.id === payload.groupdId);
      if (!group || group.playerIds.includes(payload.playerId)) {
        return;
      }

      group.playerIds.push(payload.playerId);
    },
    removePlayersFromGroups: (state, { payload }: PayloadAction<RemovePlayersInGroups>) => {
      const playersByGroup = groupBy<RemovePlayersInGroups[0]>('groupId')(payload);

      entries(playersByGroup).map(([groupId, playersToRemove]) => {
        const group = state.find(g => g.id === Number(groupId));
        if (!group) {
          return;
        }

        const playerIdsToRemove = playersToRemove.map(({ playerId }) => playerId);

        group.playerIds = group.playerIds.filter(id => !playerIdsToRemove.includes(id));
      });
    },
  },
});
// Action creators are generated for each case reducer function
export const { removePlayersFromGroups: removePlayersFromGroupsAction } = groupsSlice.actions;

export default groupsSlice.reducer;
