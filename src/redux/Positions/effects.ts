import { createListenerMiddleware } from '@reduxjs/toolkit';
import { removePlayersFromPositionAction } from '.';
import log from '../../lib/log';
import { removeManyAction as removeManyPlayersAction } from '../Players/index';
import { positionsSelector } from '../Positions/selectors';

// Create the middleware instance and methods
const listener = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listener.startListening({
  actionCreator: removeManyPlayersAction,
  effect: (action, { getState, dispatch }) => {
    const positions = positionsSelector(getState() as any);

    if (!positions) {
      return log({
        message:
          '[Positions effects] Failed to find positions state during on removeManyPlayersAction',
      });
    }

    const positionsIds = positions
      .filter(({ playerId }) => playerId && action.payload.includes(playerId))
      .map(({ index }) => index);

    positionsIds.length && dispatch(removePlayersFromPositionAction(positionsIds));
  },
});

export default listener.middleware;
