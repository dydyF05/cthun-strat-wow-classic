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

export type Props = {
  ray: number;
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

const MARKER_TRIGO_POSITION: Record<Marker, number> = {
  [Marker.Triangle]: Math.PI / 8,
  [Marker.Diamond]: (3 * Math.PI) / 8,
  [Marker.Star]: (5 * Math.PI) / 8,
  [Marker.Square]: (7 * Math.PI) / 8,
  [Marker.Cross]: (9 * Math.PI) / 8,
  [Marker.Skull]: (11 * Math.PI) / 8,
  [Marker.Circle]: (13 * Math.PI) / 8,
  [Marker.Moon]: (15 * Math.PI) / 8,
};

const getLeft = (trigoPosition: number, ray: number) => Math.cos(trigoPosition) * ray;
const getBottom = (trigoPosition: number, ray: number) => Math.sin(trigoPosition) * ray;

const getPosition = (marker: Marker, ray: number) => ({
  bottom: getBottom(MARKER_TRIGO_POSITION[marker], ray),
  left: getLeft(MARKER_TRIGO_POSITION[marker], ray),
});

const RaidMarkersLine: FunctionComponent<Props> = memo(({ ray }) => {
  return (
    <>
      {!!ray &&
        Object.values(Marker).map(marker => (
          <img
            className={classes.raidImage}
            style={getPosition(marker, ray)}
            src={`${MARKER_IMAGE[marker]}`}
            key={`marker-${marker}`}
          />
        ))}
    </>
  );
});
RaidMarkersLine.displayName = 'RaidMarkersLine';

export default RaidMarkersLine;
