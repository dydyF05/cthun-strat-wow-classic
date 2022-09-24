import { Position } from '.';
import { RootState } from '../store';

type PositionTargetParams = Pick<Position, 'line' | 'index'>;

export const positionsSelector = (state: RootState): RootState['positions'] => state.positions;

const positionSelector =
  ({ line, index }: PositionTargetParams) =>
  (state: RootState): Position | undefined =>
    positionsSelector(state).find(position => line === position.line && index === position.index);

export const positionMarkerSelector =
  (params: PositionTargetParams) =>
  (state: RootState): Position['marker'] | undefined =>
    positionSelector(params)(state)?.marker;

export const positionPlayerSelector =
  (params: PositionTargetParams) =>
  (state: RootState): Position['playerId'] =>
    positionSelector(params)(state)?.playerId;

export const positionForPlayer =
  (playerName: string) =>
  (state: RootState): Position | undefined => {
    const positions = positionsSelector(state);
    return positions.find(position => position.playerId === playerName);
  };

export const positionWithPlayerCountSelector = (state: RootState): number =>
  positionsSelector(state).filter(({ playerId }) => !!playerId).length;
