import { FunctionComponent, memo } from 'react';
import Zone from '../../containers/Zone';
import { ZoneId } from '../../redux/Zones';
import classes from './index.module.css';

export type Props = {
  /** Graph width */
  width: number;
  /** Graph height */
  height: number;
  topStairsHeight: number;
  /** The number in pixel */
  bossZoneSize: number;
  ids?: ZoneId[];
};

const Zones: FunctionComponent<Props> = memo(
  ({ ids, width, height, bossZoneSize, topStairsHeight }) => (
    <div className={classes.container}>
      <svg width={width} height={height}>
        {!!ids &&
          ids.map(id => (
            <Zone
              id={id}
              key={`zone-${id}`}
              svgHeight={height - topStairsHeight}
              svgWidth={width}
            />
          ))}
        {/* BOSS CENTER ZONE */}
        {/* Removing 12% representing top stairs zone percentate (10%) and bottom zone percentage (2%) */}
        <circle
          fill="var(--color-grey)"
          cx={width / 2}
          cy={(height * 0.88) / 2}
          r={bossZoneSize / 2}
          className={classes.center}
        />
        <text x={width / 2 - 40} y={(height * 0.88) / 2 + 10} fill="grey" fontSize={30}>
          CThun
        </text>
      </svg>
    </div>
  )
);
Zones.displayName = 'Zones';

export default Zones;
