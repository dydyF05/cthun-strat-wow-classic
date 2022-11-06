import { createListenerMiddleware } from '@reduxjs/toolkit';
import { compact, map, pipe } from 'lodash/fp';
import { removePlayersFromGroupsAction, RemovePlayersInGroups } from '.';
import log from '../../lib/log';
import { removeManyAction as removeManyPlayersAction } from '../Players/index';
import { groupsSelector } from './selectors';

// Create the middleware instance and methods
const listener = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listener.startListening({
  actionCreator: removeManyPlayersAction,
  effect: (action, { getState, dispatch }) => {
    const groups = groupsSelector(getState() as any);

    if (!groups?.length) {
      return log({
        message: '[Groups effects] Failed to find groups state during on removeManyPlayersAction',
      });
    }

    const playerIdsWithGroupIds = pipe(
      map<typeof action['payload'][0], RemovePlayersInGroups[0] | undefined>(playerId => {
        const group = groups.find(group => group.playerIds.includes(playerId));

        if (!group) {
          return;
        }

        return {
          groupId: group.id,
          playerId,
        };
      }),
      compact
    )(action.payload);

    playerIdsWithGroupIds.length && dispatch(removePlayersFromGroupsAction(playerIdsWithGroupIds));
  },
});

export default listener.middleware;
