import { Position } from '.';
import { RootState } from '../store';

type PositionTargetParams = Pick<Position, 'line' | 'index'>;

const positionsSelector = (state: RootState): RootState['positions'] => state.positions;

const positionSelector =
  ({ line, index }: PositionTargetParams) =>
  (state: RootState): Position | undefined =>
    positionsSelector(state).find(position => line === position.line && index === position.index);

export const positionMarkerSelector =
  (params: PositionTargetParams) =>
  (state: RootState): Position['marker'] | undefined =>
    positionSelector(params)(state)?.marker;
