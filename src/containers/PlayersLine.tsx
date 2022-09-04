import { FunctionComponent, useCallback } from 'react';
import Component, { Props as ComponentProps, UIPosition } from '../components/PlayersLine';
import { useDispatch } from '../hooks/redux';
import log from '../lib/log';
import { addPositions, Position as StatePosition } from '../redux/Positions';
import { getZoneIdFromTrigoPosition } from '../redux/Zones';

export type Props = Omit<ComponentProps, 'onPositionsSet'>;

const mapUIPositionToReduxPosition = (
  { trigoPosition, index }: UIPosition,
  line: Props['line']
): StatePosition | undefined => {
  const zoneId = getZoneIdFromTrigoPosition(trigoPosition, Math.cos(trigoPosition) < 0);

  if (!zoneId) {
    log({
      message: 'Failed to find zone for position',
      context: {
        trigoPosition,
        index,
        zoneId,
      },
    });
    return;
  }

  return {
    index,
    line,
    zoneId,
  };
};

const timeoutIds: Partial<Record<Props['line'], ReturnType<typeof setTimeout>>> = {};

const PlayersLine: FunctionComponent<Props> = props => {
  const { line } = props;
  const dispatch = useDispatch();

  const handlePositionsSet = useCallback<ComponentProps['onPositionsSet']>(
    positions => {
      // While dev --> twice instanciated because of strict mode
      clearTimeout(timeoutIds[line]);
      timeoutIds[line] = setTimeout(() => {
        dispatch(
          addPositions(
            positions
              .map(position => mapUIPositionToReduxPosition(position, line))
              .filter(position => !!position) as StatePosition[]
          )
        );
      }, 500);
    },
    [line]
  );

  return <Component {...props} onPositionsSet={handlePositionsSet} />;
};
export default PlayersLine;
