import { FunctionComponent, memo } from 'react';
import Circle from '../../assets/images/circle.webp';
import Cross from '../../assets/images/cross.webp';
import Diamond from '../../assets/images/diamond.webp';
import Moon from '../../assets/images/moon.webp';
import Skull from '../../assets/images/skull.webp';
import Square from '../../assets/images/square.webp';
import Star from '../../assets/images/star.webp';
import Triangle from '../../assets/images/triangle.webp';
import { Marker } from '../../types/index.d';
import classes from './index.module.css';

export type Props = Record<string, never>;

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

const getPosition = (marker: Marker) => {
  switch (marker) {
    case Marker.Star:
      return { top: -23, left: 9 };
    case Marker.Square:
      return { top: 10, left: -25 };
    case Marker.Cross:
      return { bottom: 10, left: -25 };
    case Marker.Skull:
      return { bottom: -20, left: 5 };
    case Marker.Circle:
      return { bottom: -20, right: 13 };
    case Marker.Moon:
      return { bottom: 10, right: -25 };
    case Marker.Triangle:
      return { top: 10, right: -25 };
    case Marker.Diamond:
      return { top: -23, right: 9 };
    default:
      return {};
  }
};

const BossZone: FunctionComponent<Props> = memo(() => {
  return (
    <div className={classes.container}>
      <p>Boss</p>
      {Object.values(Marker).map(marker => (
        <img
          className={classes.raidImage}
          style={getPosition(marker)}
          src={`${MARKER_IMAGE[marker]}`}
          key={`marker-${marker}`}
        />
      ))}
    </div>
  );
});
BossZone.displayName = 'BossZone';

export default BossZone;
