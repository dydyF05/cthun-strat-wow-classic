import { FunctionComponent, memo } from 'react';
import Circle from '../../assets/images/circle.webp';
import Cross from '../../assets/images/cross.webp';
import Diamond from '../../assets/images/diamond.webp';
import Moon from '../../assets/images/moon.webp';
import Skull from '../../assets/images/skull.webp';
import Square from '../../assets/images/square.webp';
import Star from '../../assets/images/star.webp';
import Triangle from '../../assets/images/triangle.webp';
import { Position as PositionStateType } from '../../redux/Positions';
import { Marker } from '../../types/index.d';
import classes from './index.module.css';

export type Props = {
  id: number;
  line: PositionStateType['line'];
  bottom: number;
  left: number;
  marker?: PositionStateType['marker'];
};

const MARKER_IMAGE: Record<Marker, string> = {
  [Marker.Circle]: Circle,
  [Marker.Cross]: Cross,
  [Marker.Diamond]: Diamond,
  [Marker.Moon]: Moon,
  [Marker.Skull]: Skull,
  [Marker.Square]: Square,
  [Marker.Star]: Star,
  [Marker.Triangle]: Triangle,
};

const Position: FunctionComponent<Props> = memo(({ id, bottom, left, marker }) => {
  return (
    <div className={classes.container} data-marker={!!marker} style={{ bottom, left }}>
      {!marker && <p>{id}</p>}
      {!!marker && (
        <img
          className={classes.raidImage}
          src={`${MARKER_IMAGE[marker]}`}
          key={`marker-${marker}`}
        />
      )}
    </div>
  );
});
Position.displayName = 'Position';

export default Position;
