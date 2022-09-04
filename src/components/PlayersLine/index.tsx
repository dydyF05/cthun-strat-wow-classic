import { FunctionComponent, memo, useMemo } from 'react';
import Position from '../Position';

export type Props = {
  line: string;
  numberOfPlayers: number;
  trigoDelta?: number;
  ray: number;
};

const getLeft = (trigoPosition: number, ray: number) => Math.cos(trigoPosition) * ray;
const getBottom = (trigoPosition: number, ray: number) => Math.sin(trigoPosition) * ray;

const getPosition = (trigoPosition: number, ray: number) => ({
  bottom: getBottom(trigoPosition, ray),
  left: getLeft(trigoPosition, ray),
});

const PlayersLine: FunctionComponent<Props> = memo(({ ray, numberOfPlayers, trigoDelta = 0 }) => {
  const positions = useMemo(() => {
    return Array.from({ length: numberOfPlayers }).map(
      (_, index) => (Math.PI * index) / (numberOfPlayers / 2) + trigoDelta
    );
  }, [numberOfPlayers, trigoDelta]);

  return (
    <>
      {!!ray &&
        positions.map(trigoPosition => (
          <Position
            {...getPosition(trigoPosition, ray)}
            key={`third-line-position-${trigoPosition}`}
          />
        ))}
    </>
  );
});
PlayersLine.displayName = 'PlayersLine';

export default PlayersLine;
