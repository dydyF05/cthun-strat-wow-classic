import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setMinimalDistanceBetweenPlayersAction } from '.';
import log from '../../lib/log';
import { computePositionsNeihborsAction } from '../Positions';
import { positionsSelector } from '../Positions/selectors';

// Create the middleware instance and methods
const listener = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listener.startListening({
  actionCreator: computePositionsNeihborsAction,
  effect: (action, { getState, dispatch }) => {
    const positions = positionsSelector(getState() as any);

    if (!positions) {
      return log({
        message:
          '[Settings effect] Failed to find positions state after computePositionsNeihborsAction',
      });
    }

    const firstLinePositions = positions
      .filter(({ line, left, top }) => line === 'first' && left !== undefined && top !== undefined)
      .sort((p1, p2) => p1.index - p2.index);
    if (firstLinePositions.length < 2) {
      return log({
        message: '[Settings effect] Missing position data after computePositionsNeihborsAction',
      });
    }

    const [p1, p2] = firstLinePositions;

    const positionDistance = Math.sqrt(
      Math.pow((p1.left as number) - (p2.left as number), 2) +
        Math.pow((p1.top as number) - (p2.top as number), 2)
    );

    (window as unknown as Record<string, boolean>).__DEV__ &&
      log({
        message: 'distance between two consecutive first line positions in pixels: ',
        context: { positionDistance },
      });

    if (positionDistance) {
      dispatch(setMinimalDistanceBetweenPlayersAction(positionDistance));
    }
  },
});

export default listener.middleware;
