import { FunctionComponent, memo, useMemo } from 'react';
import PlayersLine from '../../containers/PlayersLine';
import classes from './index.module.css';

export type Props = {
  graphWidth: number;
  graphHeight: number;
  graphTopStairsHeight: number;
  minimalPixelDistanceBetweenPlayers?: number;
  bossZoneRatio: number;
};

const FIRST_LINE_PLAYER_COUNT = 8;
const SECOND_LINE_PLAYER_COUNT = 12;

const Positions: FunctionComponent<Props> = memo(
  ({
    minimalPixelDistanceBetweenPlayers,
    graphWidth,
    graphHeight,
    graphTopStairsHeight,
    bossZoneRatio,
  }) => {
    const { firstLineRay, secondLineRay, thirdLineRay } = useMemo(() => {
      // We're looking for ray, not diamaeter hence the 2 divider
      const firstRay = (graphWidth * bossZoneRatio) / 2;

      return {
        firstLineRay: firstRay,
        secondLineRay: minimalPixelDistanceBetweenPlayers
          ? firstRay + minimalPixelDistanceBetweenPlayers
          : undefined,
        thirdLineRay: minimalPixelDistanceBetweenPlayers
          ? firstRay + minimalPixelDistanceBetweenPlayers * 2
          : undefined,
      };
    }, [graphWidth, minimalPixelDistanceBetweenPlayers, bossZoneRatio]);

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
        {!!secondLineRay && (
          <PlayersLine
            line="second"
            ray={secondLineRay}
            numberOfPlayers={SECOND_LINE_PLAYER_COUNT}
            numberOfPositionsBeforeLine={FIRST_LINE_PLAYER_COUNT}
          />
        )}
        {!!thirdLineRay && (
          <PlayersLine
            line="third"
            ray={thirdLineRay}
            numberOfPlayers={20}
            numberOfPositionsBeforeLine={FIRST_LINE_PLAYER_COUNT + SECOND_LINE_PLAYER_COUNT}
            trigoDelta={Math.PI / 4}
          />
        )}
      </div>
    );
  }
);
Positions.displayName = 'Positions';

export default Positions;
