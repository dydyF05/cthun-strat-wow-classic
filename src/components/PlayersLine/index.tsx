import { FunctionComponent, memo, useEffect, useMemo } from 'react';
import Position, { Props as PositionProps } from '../../containers/Position';

export type UIPosition = { trigoPosition: number; index: number };

export type Props = {
  numberOfPositionsBeforeLine: number;
  numberOfPlayers: number;
  trigoDelta?: number;
  ray: number;
  onPositionsSet: (positions: UIPosition[]) => void;
} & Pick<PositionProps, 'line'>;

const getLeft = (trigoPosition: number, ray: number) => Math.cos(trigoPosition) * ray;
const getBottom = (trigoPosition: number, ray: number) => Math.sin(trigoPosition) * ray;

const getPosition = (trigoPosition: number, ray: number) => ({
  bottom: getBottom(trigoPosition, ray),
  left: getLeft(trigoPosition, ray),
});

const PlayersLine: FunctionComponent<Props> = memo(
  ({
    numberOfPositionsBeforeLine,
    ray,
    numberOfPlayers,
    trigoDelta = 0,
    onPositionsSet,
    ...props
  }) => {
    const positions = useMemo<UIPosition[]>(() => {
      return Array.from({ length: numberOfPlayers }).map(
        (_, index): UIPosition => ({
          trigoPosition: (Math.PI * index) / (numberOfPlayers / 2) + trigoDelta,
          index: index + 1 + numberOfPositionsBeforeLine,
        })
      );
    }, [numberOfPlayers, trigoDelta, numberOfPositionsBeforeLine]);

    useEffect(() => {
      onPositionsSet(positions);
    }, [positions]);

    return (
      <>
        {!!ray &&
          positions.map(({ trigoPosition, index }) => (
            <Position
              {...props}
              {...getPosition(trigoPosition, ray)}
              id={index}
              key={`${props.line}-position-${trigoPosition}`}
            />
          ))}
      </>
    );
  }
);
PlayersLine.displayName = 'PlayersLine';

export default PlayersLine;
