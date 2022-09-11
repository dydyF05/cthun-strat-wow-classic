import { FunctionComponent, memo, useMemo } from 'react';
import PlayersLine from '../../containers/PlayersLine';
import classes from './index.module.css';

export type Props = {
  graphWidth: number;
  graphHeight: number;
  graphTopStairsHeight: number;
  /** The meter distance separating the first line from the boss */
  firstLineDistance: number;
  /** The meter distance separating the second line from the boss */
  secondLineDistance: number;
  /** The meter distance separating the third line from the boss */
  thirdLineDistance: number;
};

const FIRST_LINE_PLAYER_COUNT = 8;
const SECOND_LINE_PLAYER_COUNT = 12;

const Positions: FunctionComponent<Props> = memo(
  ({
    firstLineDistance,
    secondLineDistance,
    thirdLineDistance,
    graphWidth,
    graphHeight,
    graphTopStairsHeight,
  }) => {
    const { firstLineRay, secondLineRay, thirdLineRay } = useMemo(() => {
      const firstRay = graphWidth * 0.1;

      return {
        firstLineRay: firstRay,
        secondLineRay: (firstRay * secondLineDistance) / firstLineDistance,
        thirdLineRay: (firstRay * thirdLineDistance) / firstLineDistance,
      };
    }, [graphWidth, firstLineDistance, secondLineDistance, thirdLineDistance]);

    return (
      <div
        className={classes.container}
        // Add 10px to top to count graph border
        style={{ top: graphTopStairsHeight + 10, height: (graphHeight - graphTopStairsHeight) / 2 }}
      >
        <PlayersLine
          line="first"
          ray={firstLineRay}
          numberOfPlayers={FIRST_LINE_PLAYER_COUNT}
          numberOfPositionsBeforeLine={0}
          trigoDelta={Math.PI / 8}
        />
        <PlayersLine
          line="second"
          ray={secondLineRay}
          numberOfPlayers={SECOND_LINE_PLAYER_COUNT}
          numberOfPositionsBeforeLine={FIRST_LINE_PLAYER_COUNT}
        />
        <PlayersLine
          line="third"
          ray={thirdLineRay}
          numberOfPlayers={20}
          numberOfPositionsBeforeLine={FIRST_LINE_PLAYER_COUNT + SECOND_LINE_PLAYER_COUNT}
          trigoDelta={Math.PI / 4}
        />
      </div>
    );
  }
);
Positions.displayName = 'Positions';

export default Positions;
