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

const LINES = {
  1: 8,
  2: 8,
  3: 16,
  4: 8,
};

const Positions: FunctionComponent<Props> = memo(
  ({
    minimalPixelDistanceBetweenPlayers,
    graphWidth,
    graphHeight,
    graphTopStairsHeight,
    bossZoneRatio,
  }) => {
    const { firstLineRay, secondLineRay, thirdLineRay, fourthLineRay } = useMemo(() => {
      // We're looking for ray, not diameter, hence the 2 divider
      const firstRay = (graphWidth * bossZoneRatio) / 2;
      const secondRay = minimalPixelDistanceBetweenPlayers
        ? firstRay + minimalPixelDistanceBetweenPlayers
        : undefined;
      const thirdRay =
        secondRay && minimalPixelDistanceBetweenPlayers
          ? secondRay + minimalPixelDistanceBetweenPlayers * 1.1
          : undefined;
      const fourthRay =
        thirdRay && minimalPixelDistanceBetweenPlayers
          ? thirdRay + minimalPixelDistanceBetweenPlayers * 1.1
          : undefined;

      return {
        firstLineRay: firstRay,
        secondLineRay: secondRay,
        thirdLineRay: thirdRay,
        fourthLineRay: fourthRay,
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
          numberOfPlayers={LINES[1]}
          numberOfPositionsBeforeLine={0}
          trigoDelta={Math.PI / 8}
        />
        {!!secondLineRay && (
          <PlayersLine
            line="second"
            ray={secondLineRay}
            numberOfPlayers={LINES[2]}
            numberOfPositionsBeforeLine={LINES[1]}
            trigoDelta={Math.PI / 8}
          />
        )}
        {!!thirdLineRay && (
          <PlayersLine
            line="third"
            ray={thirdLineRay}
            numberOfPlayers={LINES[3]}
            numberOfPositionsBeforeLine={LINES[1] + LINES[2]}
            trigoDelta={(Math.PI * 0.5) / 8}
          />
        )}
        {!!fourthLineRay && (
          <PlayersLine
            line="fourth"
            ray={fourthLineRay}
            numberOfPlayers={LINES[4]}
            numberOfPositionsBeforeLine={LINES[1] + LINES[2] + LINES[3]}
            trigoDelta={Math.PI / 8}
          />
        )}
      </div>
    );
  }
);
Positions.displayName = 'Positions';

export default Positions;
