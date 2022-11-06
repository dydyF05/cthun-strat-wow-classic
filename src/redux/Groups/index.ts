import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { entries, groupBy } from 'lodash/fp';
import { getColorForGroupIndex } from '../../theme';
import { Player } from '../Players';

export const MAX_PLAYERS_PER_GROUP = 5;

export type Group = {
  id: number;
  playerIds: (Player['id'] | undefined)[];
  color: string;
};

/** Groups state */
export type State = Group[];

type AddPlayerInGroup = {
  groupId: Group['id'];
  index?: number;
  playerId: Group['playerIds'][0];
};
type AddPlayersInGroups = {
  groupId: Group['id'];
  index: number;
  playerId: Group['playerIds'][0];
}[];

export type RemovePlayersInGroups = Omit<AddPlayerInGroup, 'index'>[];

const getInitialState = (): State =>
  Array.from({ length: 8 }).map((_, index) => ({
    id: index + 1,
    playerIds: Array.from({ length: MAX_PLAYERS_PER_GROUP }).map(() => undefined),
    color: getColorForGroupIndex(index),
  }));

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: getInitialState(),
  reducers: {
    addPlayerToGroup: (state, { payload }: PayloadAction<AddPlayerInGroup>) => {
      const group = state.find(group => group.id === payload.groupId);
      if (!group) {
        return;
      }

      // Remove player id occurences first
      for (const group of state) {
        for (let index = 0; index < group.playerIds.length; index++) {
          const element = group.playerIds[index];
          if (element === payload.playerId) {
            group.playerIds[index] = undefined;
          }
        }
      }

      if (typeof payload.index === typeof 123) {
        group.playerIds[payload.index as number] = payload.playerId;
        return;
      }

      const firstEmptyIndex = group.playerIds.findIndex(slot => !slot);
      if (firstEmptyIndex !== -1) {
        group.playerIds[firstEmptyIndex] = payload.playerId;
        return;
      }

      group.playerIds[MAX_PLAYERS_PER_GROUP - 1] = payload.playerId;
    },
    addPlayersToGroup: (state, { payload }: PayloadAction<AddPlayersInGroups>) => {
      for (const player of payload) {
        const group = state.find(group => group.id === player.groupId);
        if (!group) {
          continue;
        }

        group.playerIds[player.index] = player.playerId;
      }
    },
    removePlayersFromGroups: (state, { payload }: PayloadAction<RemovePlayersInGroups>) => {
      const playersByGroup = groupBy<RemovePlayersInGroups[0]>('groupId')(payload);

      entries(playersByGroup).map(([groupId, playersToRemove]) => {
        const group = state.find(g => g.id === Number(groupId));
        if (!group) {
          return;
        }

        const playerIdsToRemove = playersToRemove
          .map(({ playerId }) => playerId)
          .reduce((record, playerId) => {
            playerId && (record[playerId] = true);
            return record;
          }, {} as Record<string, true>);

        for (let index = 0; index < group.playerIds.length; index++) {
          const slot = group.playerIds[index];
          if (slot && playerIdsToRemove[slot]) {
            group.playerIds[index] = undefined;
          }
        }
      });
    },
    reset: state => {
      state.splice(0, state.length);
      state.push(...getInitialState());
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  removePlayersFromGroups: removePlayersFromGroupsAction,
  reset: resetAction,
  addPlayerToGroup: addPlayerToGroupAction,
  addPlayersToGroup: addPlayersToGroupAction,
} = groupsSlice.actions;

export default groupsSlice.reducer;
