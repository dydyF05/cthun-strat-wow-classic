import { FunctionComponent, memo } from 'react';
import Zone from '../../containers/Zone';
import { ZoneId } from '../../redux/Zones';
import BossZone from '../CenterZone';
import classes from './index.module.css';

export type Props = {
  width: number;
  height: number;
  topStairsHeight: number;
  ids?: ZoneId[];
};

const Zones: FunctionComponent<Props> = memo(({ ids, width, height, topStairsHeight }) => {
  return (
    <div className={classes.container}>
      <div className={classes.center}>
        <BossZone />
      </div>
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
      </svg>
    </div>
  );
});
Zones.displayName = 'Zones';

export default Zones;
